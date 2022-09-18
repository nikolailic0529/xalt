# frozen_string_literal: true

module Conversations
  class Update < Core::BaseCommand
    attribute :current_user, User
    attribute :conversation, Conversation
    attribute :mark_as_read, Virtus::JsonapiBooleanFilterAttributes

    validates :current_user, :conversation, presence: true

    attr_reader :conversation

    def authorized?
      current_user.member? || current_user.coach? || current_user.admin?
    end

    def process
      mark_as_readed if mark_as_read.present? && mark_as_read
    end

    def broadcast_ok
      broadcast(:ok, conversation)
    end

    private

    def mark_as_readed
      conversation.mark_as_read!(for: current_user)
    end
  end
end
