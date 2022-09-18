# frozen_string_literal: true

module Meetings
  class Create < Core::BaseCommand
    attribute :current_user,      User
    attribute :coach_profile_id,  String
    attribute :member_profile_id, String
    attribute :program_id,        String
    attribute :time_from,         String
    attribute :time_to,           String

    validates :coach_profile_id, :member_profile_id, :time_from, :time_to, presence: true
    validates :program_id, presence: true
    validate :coach_can_not_invite_stranger_member
    validate :coach_can_not_create_meeting_in_past_time
    validate :meeting_should_be_15_minutes
    validate :meeting_limit_for_member
    validate :subscription_expired?

    include Core::BaseValidator

    attr_reader :meeting

    def authorized?
      current_user.coach? || current_user.admin?
    end

    def process
      Meeting.transaction do
        create_meeting
        create_google_meet unless Rails.env.test?
        create_meeting_jobs
        create_notification
      end
    end

    def broadcast_ok
      broadcast(:ok, meeting)
    end

    protected

    def create_google_meet
      meet = CalendarService.call(coach_profile_id: coach_profile_id, member_profile_id: member_profile_id,
                                  time_from: time_from, time_to: time_to)
      meeting.update!(google_meet_url: meet.hangout_link)
    end

    def create_notification
      NotificationService.call(user_id:          meeting.member_profile.user_id,
                               type:             :new_meeting,
                               time:             meeting.time_from,
                               coach_profile_id: meeting.coach_profile.id)
    end

    def create_meeting
      @meeting = Meeting.create!(updated_attributes.except!(:current_user))
    end

    def create_meeting_jobs
      Meetings::MeetingJobsService.call(meeting_id: meeting.id, create_meeting_jobs: true)
    end

    def coach_can_not_invite_stranger_member
      return if current_user.admin?
      return if MemberProfile.exists?(coach_profile_id: coach_profile_id, id: member_profile_id)

      errors.add(:meeting, :coach_can_not_invite_stranger_member)
    end

    def coach_can_not_create_meeting_in_past_time
      return if time_from.blank?
      return if time_from.to_time > Time.zone.now

      errors.add(:meeting, :coach_can_not_create_meeting_in_past_time)
    end

    def meeting_should_be_15_minutes
      return if time_from.blank? || time_to.blank?
      return if (time_to.to_time - time_from.to_time) == 15.minutes

      errors.add(:meeting, :meeting_should_be_15_minutes)
    end

    def meeting_limit_for_member
      return if member_profile_id.nil?
      return unless MemberProfile.exists?(coach_profile_id: coach_profile_id, id: member_profile_id)
      return if meeting_limit == 'limit_is_not_reached'
      return errors.add(:meeting, :no_subscription) if meeting_limit == 'no_subscription'
    end

    def subscription_expired?
      return if member_profile_id.nil?
      return errors.add(:meeting, :expired_subscription) if meeting_limit == 'expired_subscription'
      return errors.add(:meeting, :meeting_limit_for_member) if meeting_limit == 'limit_is_reached'
    end

    def meeting_limit
      @meeting_limit ||= Meetings::MemberSessionLimitService.call(member_profile_id: member_profile_id,
                                                                  current_user:      current_user)
    end
  end
end
