# frozen_string_literal: true

class QuestionsSerializer < ActiveModel::Serializer
  type :report_questions
  attributes :id, :title, :question_type
end
