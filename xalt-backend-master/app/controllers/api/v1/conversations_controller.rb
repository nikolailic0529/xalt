# frozen_string_literal: true

class Api::V1::ConversationsController < AuthenticatedController
  def index
    conversations = find_conversations_grid_query

    render(json: conversations, each_serializer: ConversationsSerializer, status: :ok, include: inclusions_params)
  end

  def update
    conversation = run_command!(Conversations::Update,
                                params_with_current_user.merge(conversation: find_conversation_query))

    render(json: conversation, serializer: ConversationsSerializer, status: :ok, include: 'read_marks')
  end

  protected

  def find_conversations_grid_query
    Conversations::GridQuery.call(params_with_current_user)
  end

  def find_conversations_query
    Conversations::BaseQuery.call(params_with_current_user)
  end

  def find_conversation_query
    @find_conversation_query ||= find_conversations_query.find(params_with_current_user[:id])
  end
end
