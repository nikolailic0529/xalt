# frozen_string_literal: true

module Notifications
  class Update < Core::BaseCommand
    attribute :current_user, User
    attribute :notification, Notification
    attribute :mark_as_read, Virtus::JsonapiBooleanFilterAttributes

    validates :current_user, :notification, :mark_as_read, presence: true

    def authorized?
      current_user.member? || current_user.coach?
    end

    def process
      update_notification
    end

    def broadcast_ok
      broadcast(:ok, notification)
    end

    protected

    def update_notification
      notification.update!(params)
    end

    def params
      updated_attributes.except!(:current_user, :notification)
    end
  end
end
