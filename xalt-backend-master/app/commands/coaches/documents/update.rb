# frozen_string_literal: true

module Coaches
  module Documents
    class Update < Core::BaseCommand
      attribute :current_user, User
      attribute :name,         String
      attribute :file
      attribute :is_verified,  Virtus::JsonapiBooleanFilterAttributes
      attribute :document,     CoachDocument

      validate :coach_can_not_verify_document
      include Core::BaseValidator

      def authorized?
        current_user.admin? || current_user.coach?
      end

      def process
        CoachDocument.transaction do
          update_document
          unverify_document if attribute_changed?(:file)
        end
      end

      def broadcast_ok
        broadcast(:ok, document)
      end

      protected

      def update_document
        document.update!(params)
      end

      def params
        updated_attributes.except!(:current_user, :document)
      end

      def unverify_document
        document.update(is_verified: false)
      end

      def coach_can_not_verify_document
        return if current_user.admin?

        errors.add(:document, :coach_can_not_verify_document) if updated_attributes.include?(:is_verified)
      end
    end
  end
end
