# frozen_string_literal: true

module Programs
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Program.all if current_user.admin?
      return Program.where(coach_profile_id: current_user.coach_profile.id) if current_user.coach?
      return Program.where(member_profile_id: current_user.member_profile.id) if current_user.member?

      Program.none
    end
  end
end
