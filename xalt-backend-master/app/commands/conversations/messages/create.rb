# frozen_string_literal: true

module Conversations
  module Messages
    class Create < Core::BaseCommand
      attribute :current_user, User
      attribute :conversation_id, String
      attribute :sender, User
      attribute :content, String, default: ''

      validates :current_user, :sender, :conversation_id, :content, presence: true
      include Core::BaseValidator

      attr_reader :message

      def authorized?
        current_user.member? || current_user.coach? || current_user.admin?
      end

      def process
        Message.transaction do
          create_message
          message.conversation.mark_as_read!(for: current_user)
          MessageBroadcastJob.perform_later(message.id)
        end
      end

      def broadcast_ok
        broadcast(:ok, message)
      end

      private

      def create_message
        @message = Message.create!(updated_attributes.except(:current_user))
      end
    end
  end
end
