# frozen_string_literal: true

class ConversationsSerializer < ActiveModel::Serializer
  type :conversations
  attributes :id, :created_at, :updated_at

  has_many :users, serializer: ::UsersSerializer
  has_many :read_marks, serializer: ::ReadMarksSerializer
  has_many :messages, serializer: ::MessagesSerializer
end
