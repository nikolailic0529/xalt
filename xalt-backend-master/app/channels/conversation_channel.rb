# frozen_string_literal: true

class ConversationChannel < ApplicationCable::Channel
  # calls when a client connects to the server
  def subscribed
    Conversation.exists?(id: params[:conversation_id]) ? stream_from("ChatRoom-#{params[:conversation_id]}") : reject
  end
end
