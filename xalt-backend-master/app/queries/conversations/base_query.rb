# frozen_string_literal: true

module Conversations
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Conversation.all if current_user.admin?

      if current_user.coach? || current_user.member?
        return current_user.conversations.left_outer_joins(:messages, :users).distinct
      end

      Conversation.none
    end
  end
end
