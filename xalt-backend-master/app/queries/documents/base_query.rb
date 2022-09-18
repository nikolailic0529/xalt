# frozen_string_literal: true

module Documents
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return CoachDocument.all if current_user.admin?
      return CoachDocument.where(coach_profile_id: current_user.coach_profile.id) if current_user.coach?

      CoachDocument.none
    end
  end
end
