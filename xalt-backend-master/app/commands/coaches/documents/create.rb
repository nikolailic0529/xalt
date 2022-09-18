# frozen_string_literal: true

module Coaches
  module Documents
    class Create < Core::BaseCommand
      attribute :current_user,  User
      attribute :name,          String
      attribute :file
      attribute :coach_profile, CoachProfile

      validates :name, :file, :coach_profile, presence: true
      include Core::BaseValidator

      attr_reader :document

      def authorized?
        current_user.admin? || current_user.coach?
      end

      def process
        create_document
      end

      def broadcast_ok
        broadcast(:ok, document)
      end

      protected

      def create_document
        @document = CoachDocument.create!(params)
      end

      def params
        updated_attributes.except!(:current_user)
      end
    end
  end
end
