# frozen_string_literal: true

module Users
  class Update < Core::BaseCommand
    attribute :current_user, User
    attribute :user, User
    attribute :name, String
    attribute :role, String
    attribute :is_onboarding_finished, Virtus::JsonapiBooleanFilterAttributes
    attribute :avatar

    validates :current_user, :user, presence: true
    validates :is_onboarding_finished, inclusion: {in: [true, false]}
    validates :role, inclusion: {in: User::ROLES}, if: -> { role.present? }
    include Core::BaseValidator

    def authorized?
      current_user.admin?
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
      user.update!(params)
    end

    def params
      updated_attributes.except(:current_user, :user)
    end
  end
end
