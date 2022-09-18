# frozen_string_literal: true

module Notifications
  class Delete < Core::BaseCommand
    attribute :current_user, User
    attribute :notification, Notification

    def authorized?
      current_user.coach? || current_user.member?
    end

    def broadcast_ok
      broadcast(:ok)
    end

    def process
      delete_notification
    end

    protected

    def delete_notification
      notification.destroy
    end
  end
end
