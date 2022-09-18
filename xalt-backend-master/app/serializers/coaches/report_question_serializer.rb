# frozen_string_literal: true

class Coaches::ReportQuestionSerializer < ActiveModel::Serializer
  type :report_questions
  attributes :id, :title, :question_type

  has_many :report_answers, serializer: Coaches::ReportAnswerSerializer
end
