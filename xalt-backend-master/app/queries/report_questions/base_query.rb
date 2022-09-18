# frozen_string_literal: true

module ReportQuestions
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return ReportQuestion.all if current_user.admin? || current_user.coach? || current_user.member?

      ReportQuestion.none
    end
  end
end
