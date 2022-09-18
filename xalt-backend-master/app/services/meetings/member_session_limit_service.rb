# frozen_string_literal: true

class Meetings::MemberSessionLimitService < Core::BaseService
  # rubocop:disable Lint/DuplicateMethods
  attribute :member_profile_id, String
  attribute :current_user, User

  attr_reader :member_profile

  def call
    lesson_count = member_profile.user.lesson_count
    return 'no_subscription' unless member_profile.subscription || lesson_count
    if (member_profile.user.stripe['current_period_end'].blank? || subscription_expired?) && !lesson_count
      return 'expired_subscription'
    end
    return 'limit_is_not_reached' if lesson_count || widget_response.empty?
    return 'limit_is_reached' if limit_is_reached?
  end

  private

  def member_profile
    @member_profile ||= MemberProfile.eager_load(:subscription, :user).find(member_profile_id)
  end

  def widget_response
    @widget_response ||= Analytics::Widgets::MeetingsCountByMember.call(updated_attributes.merge!(time_range))
  end

  def limit_is_reached?
    session_limit = member_profile.subscription.sessions_count
    member_meetings_count = widget_response[0]['value'].to_i
    member_meetings_count >= session_limit
  end

  def subscription_expired?
    Time.zone.at(member_profile.user.stripe['current_period_end']).to_datetime < Time.zone.now
  end

  def time_range
    {
      time_from: Time.zone.at(member_profile.user.stripe['current_period_start']).to_datetime,
      time_to:   Time.zone.at(member_profile.user.stripe['current_period_end']).to_datetime
    }
  end
end
# rubocop:enable Lint/DuplicateMethods
