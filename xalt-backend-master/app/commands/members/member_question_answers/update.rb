# frozen_string_literal: true

module Members
  module MemberQuestionAnswers
    class Update < Core::BaseCommand
      attribute :current_user, User
      attribute :member_question_answer, MemberQuestionAnswer
      attribute :user, User
      attribute :identifier, String
      attribute :answer, JSON

      validates :current_user, :user, :member_question_answer, presence: true

      include Core::BaseValidator

      def authorized?
        current_user.coach? || current_user.member? && current_user == user
      end

      def process
        MemberQuestionAnswer.transaction do
          update_member_question_answers
          member_question_answer.reload
        end
      end

      def broadcast_ok
        broadcast(:ok, member_question_answer)
      end

      protected

      def update_member_question_answers
        member_question_answer.update!(params)
      end

      def params
        updated_attributes.except(:current_user, :member_question_answer, :user)
      end
    end
  end
end
