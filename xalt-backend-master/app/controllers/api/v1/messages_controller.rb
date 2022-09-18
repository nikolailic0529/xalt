# frozen_string_literal: true

class Api::V1::MessagesController < AuthenticatedController
  def index
    messages = find_messages_query

    render(json: messages, each_serializer: MessagesSerializer, status: :ok)
  end

  def create
    message = run_command!(Conversations::Messages::Create, params_with_current_user.merge(sender: current_user))

    render(json: message, serializer: MessagesSerializer, status: :ok, include: 'sender,conversation.read_marks')
  end

  protected

  def find_messages_query
    Messages::GridQuery.call(params_with_current_user)
  end
end
