# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      authorized? ? user : reject_unauthorized_connection
    end

    def authorized?
      user&.valid_token?(request.params['access_token'], request.params['access_client'])
    end

    def user
      @user ||= User.find_by(uid: request.params['access_uid'])
    end
  end
end
