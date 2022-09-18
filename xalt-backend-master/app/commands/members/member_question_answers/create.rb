# frozen_string_literal: true

module Members
  module MemberQuestionAnswers
    class Create < Core::BaseCommand
      attribute :current_user, User
      attribute :user, User
      attribute :identifier, String
      attribute :answer, JSON

      validates :current_user, :user, presence: true
      validate :member_question_answers_exists?
      include Core::BaseValidator

      attr_reader :member_question_answers

      def authorized?
        current_user.member? && current_user == user
      end

      def process
        create_member_question_answers
      end

      def broadcast_ok
        broadcast(:ok, member_question_answers)
      end

      protected

      def create_member_question_answers
        @member_question_answers = MemberQuestionAnswer.create!(params)
      end

      def params
        updated_attributes.except(:current_user)
      end

      def member_question_answers_exists?
        return if current_user.member_question_answer.blank?

        errors.add(:member_question_answers, :member_question_answers_already_exists)
      end
    end
  end
end
