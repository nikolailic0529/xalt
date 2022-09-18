# frozen_string_literal: true

module Users
  class ResetPassword < Core::BaseCommand
    attribute :user, User
    attribute :password, String
    attribute :password_confirmation, String

    validates :user, :password, :password_confirmation, presence: true
    validate :password_should_match_with_confirmation
    include Core::BaseValidator

    def authorized?
      true
    end

    def process
      update_user
      user.reload
    end

    def broadcast_ok
      broadcast(:ok, user)
    end

    protected

    def update_user
      user.reset_password(password, password_confirmation)
    end

    def password_should_match_with_confirmation
      errors.add(:password, :should_match_with_confirmation) unless password == password_confirmation
    end
  end
end
