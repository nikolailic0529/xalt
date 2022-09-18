# frozen_string_literal: true

class Members::MemberQuestionAnswersSerializer < ActiveModel::Serializer
  type :members_question_answers
  attributes :id, :identifier, :answer

  belongs_to :user, serializer: ::UsersSerializer
end
