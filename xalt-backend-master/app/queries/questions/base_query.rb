# frozen_string_literal: true

module Questions
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return ReportQuestion.all if current_user.admin? || current_user.coach?

      ReportQuestion.none
    end
  end
end
