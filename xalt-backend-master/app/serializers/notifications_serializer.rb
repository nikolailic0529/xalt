# frozen_string_literal: true

class NotificationsSerializer < ActiveModel::Serializer
  type :notifications
  attributes :id, :created_at, :updated_at, :type, :content, :additional_info, :mark_as_read

  belongs_to :user, serializer: ::UsersSerializer
end
