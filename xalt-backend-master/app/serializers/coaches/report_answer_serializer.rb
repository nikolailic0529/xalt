# frozen_string_literal: true

class Coaches::ReportAnswerSerializer < ActiveModel::Serializer
  type :report_answers
  attributes :id, :score, :answer, :report_question_id, :report_id

  belongs_to :report_question, serializer: Coaches::ReportQuestionSerializer
  belongs_to :report, serializer: Coaches::ReportSerializer
end
