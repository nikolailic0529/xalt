# frozen_string_literal: true

module ReportQuestions
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :question_type, String

    def base_relation
      ReportQuestions::BaseQuery.call(current_user: current_user)
    end

    private

    def execute
      self.relation = relation.where(question_type: question_type) if question_type.present?
    end
  end
end
