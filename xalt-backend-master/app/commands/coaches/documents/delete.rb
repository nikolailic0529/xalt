# frozen_string_literal: true

module Coaches
  module Documents
    class Delete < Core::BaseCommand
      attribute :current_user, User
      attribute :document,     CoachDocument

      validates :document, presence: true

      def authorized?
        current_user.coach? || current_user.admin?
      end

      def process
        delete_document_exercise
      end

      protected

      def delete_document_exercise
        document.remove_file!
        document.destroy!
      end
    end
  end
end
