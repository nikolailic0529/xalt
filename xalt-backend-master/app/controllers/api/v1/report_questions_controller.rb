# frozen_string_literal: true

class Api::V1::ReportQuestionsController < AuthenticatedController
  def index
    questions = find_questions_query

    render(json: questions, each_serializer: QuestionsSerializer, status: :ok)
  end

  protected

  def find_questions_query
    ReportQuestions::GridQuery.call(params_with_current_user)
  end
end
