# frozen_string_literal: true

module Notifications
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Notification.joins(:user).includes(:user).all if current_user.admin?

      if current_user.coach? || current_user.member?
        return Notification.joins(:user).includes(:user).where(user_id: current_user.id)
      end

      Notification.none
    end
  end
end
