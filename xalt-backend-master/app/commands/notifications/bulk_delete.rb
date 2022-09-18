# frozen_string_literal: true

module Notifications
  class BulkDelete < Core::BaseCommand
    attribute :current_user, User

    def authorized?
      current_user.member? || current_user.coach? || current_user.admin?
    end

    def broadcast_ok
      broadcast(:ok)
    end

    def process
      delete_notifications
    end

    protected

    def delete_notifications
      current_user.notifications.destroy_all
    end
  end
end
