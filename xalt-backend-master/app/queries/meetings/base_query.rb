# frozen_string_literal: true

module Meetings
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Meeting.all if current_user.admin?

      if current_user.coach?
        return Meeting.joins([{coach_profile: :user}, {member_profile: :user}, :program])
                      .left_outer_joins(:report)
                      .where(meetings: {coach_profile_id: current_user.coach_profile.id})
      end

      if current_user.member?
        return Meeting.joins({coach_profile: :user}, {member_profile: :user}, :program)
                      .left_outer_joins(:report)
                      .where(meetings: {member_profile_id: current_user.member_profile.id})
      end

      Meeting.none
    end
  end
end
