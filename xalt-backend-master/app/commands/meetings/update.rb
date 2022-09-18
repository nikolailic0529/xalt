# frozen_string_literal: true

module Meetings
  class Update < Core::BaseCommand
    attribute :current_user,        User
    attribute :meeting,             Meeting
    attribute :is_member_confirmed, Virtus::JsonapiBooleanFilterAttributes
    attribute :time_from,           String
    attribute :time_to,             String

    validates :meeting, presence: true
    validate :member_can_not_change_meeting_date
    validate :coach_can_not_confirm_meeting
    validate :coach_can_not_change_meeting_to_past
    validate :meeting_should_be_15_minutes
    validate :meeting_date_could_not_be_changed_15_minutes_before_the_meeting
    include Core::BaseValidator

    def authorized?
      current_user.coach? || current_user.admin? || current_user.member?
    end

    def process
      Meeting.transaction do
        update_meeting
        rerun_all_jobs if (attribute_changed?(:time_from) || attribute_changed?(:time_to)) && !Rails.env.test?
        meeting.reload
      end
    end

    def broadcast_ok
      broadcast(:ok, meeting)
    end

    protected

    def update_meeting
      meeting.update!(updated_attributes.except!(:current_user, :meeting))
    end

    def rerun_all_jobs
      Meetings::MeetingJobsService.call(meeting_id: meeting.id, create_meeting_jobs: true, delete_meeting_jobs: true)
    end

    def member_can_not_change_meeting_date
      return if current_user.admin?
      return unless (time_to.present? || time_from.present?) && current_user.member?

      errors.add(:meeting, :member_can_not_change_meeting_date)
    end

    def coach_can_not_confirm_meeting
      return if current_user.admin?

      errors.add(:meeting, :coach_can_not_confirm_meeting) if is_member_confirmed.present? && current_user.coach?
    end

    def coach_can_not_change_meeting_to_past
      return if time_to.blank?
      return if time_from.blank?

      errors.add(:meeting, :coach_can_not_change_meeting_to_past) if time_from.to_time < Time.zone.now ||
        time_to.to_time < Time.zone.now
    end

    def meeting_date_could_not_be_changed_15_minutes_before_the_meeting
      return if time_to.blank?
      return if time_from.blank?

      errors.add(:meeting, :can_not_be_changed_15_minutes_before) if Time.zone.now > meeting.time_from - 15.minutes
    end

    def meeting_should_be_15_minutes
      return if time_from.blank? || time_to.blank?
      return if (time_to.to_time - time_from.to_time) == 15.minutes

      errors.add(:meeting, :meeting_should_be_15_minutes)
    end
  end
end
