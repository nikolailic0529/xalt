# frozen_string_literal: true

module Members
  module Profiles
    class BaseQuery < Core::BaseQuery
      attribute :current_user, User

      def base_relation
        return MemberProfile.all if current_user.admin?
        return MemberProfile.where(user_id: current_user.id) if current_user.member?
        return MemberProfile.where(coach_profile: current_user.coach_profile) if current_user.coach?

        MemberProfile.none
      end
    end
  end
end
