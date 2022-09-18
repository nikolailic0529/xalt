# frozen_string_literal: true

class MessagesSerializer < ActiveModel::Serializer
  type :messages
  attributes :id, :created_at, :content, :sender_id

  belongs_to :conversation, serializer: ::ConversationsSerializer
  belongs_to :sender, serializer: ::UsersSerializer
end
