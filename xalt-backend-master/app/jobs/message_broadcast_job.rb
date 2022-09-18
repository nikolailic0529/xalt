# frozen_string_literal: true

class MessageBroadcastJob < ApplicationJob
  queue_as :chat_messages

  def perform(message_id)
    message = Message.eager_load([{conversation: :read_marks}, :sender])
                     .find(message_id)

    ActionCable.server.broadcast("ChatRoom-#{message.conversation.id}",
                                 {
                                   id:              message.id,
                                   conversation_id: message.conversation_id,
                                   content:         message.content,
                                   sender_id:       message.sender_id,
                                   participants:    message.conversation.users.collect(&:id),
                                   read_marks:      message.conversation.read_marks,
                                   created_at:      message.created_at
                                 })
  end
end
