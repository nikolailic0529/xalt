# frozen_string_literal: true

module Users
  class ChangePassword < Core::BaseCommand
    attribute :current_user, User

    attribute :old_password, String
    attribute :new_password, String
    attribute :new_password_confirmation, String

    validates :old_password, :new_password, :new_password_confirmation, presence: true
    validates_length_of :new_password, minimum: 6, maximum: 128
    validate :old_password_should_be_valid
    validate :new_password_and_confirmation_should_match

    include Core::BaseValidator

    def authorized?
      current_user.member? || current_user.coach? || current_user.admin?
    end

    def process
      update_password
      current_user.reload
    end

    def broadcast_ok
      broadcast(:ok, current_user)
    end

    protected

    def update_password
      current_user.reset_password(new_password, new_password_confirmation)
    end

    def old_password_should_be_valid
      return if current_user.valid_password?(old_password)

      errors.add(:old_password, :old_password_should_be_valid)
    end

    def new_password_and_confirmation_should_match
      return if new_password == new_password_confirmation

      errors.add(:new_password, :new_password_and_confirmation_should_match)
    end
  end
end
