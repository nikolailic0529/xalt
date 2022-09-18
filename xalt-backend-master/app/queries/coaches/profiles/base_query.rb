# frozen_string_literal: true

module Coaches
  module Profiles
    class BaseQuery < Core::BaseQuery
      attribute :current_user, User

      def base_relation
        return CoachProfile.all if current_user.admin?
        return CoachProfile.where(user_id: current_user.id) if current_user.coach?

        if current_user.member?
          return CoachProfile.joins(coach_fitnes_domains: :fitnes_domain)
                             .where(fitnes_domains: {id: current_user.member_profile.fitnes_domain_ids})
        end

        CoachProfile.none
      end
    end
  end
end
