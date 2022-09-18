# frozen_string_literal: true

module Users
  class Create < Core::BaseCommand
    attribute :current_user, User
    attribute :email, String
    attribute :name, String
    attribute :password, String
    attribute :role, String
    attribute :is_onboarding_finished, Virtus::JsonapiBooleanFilterAttributes
    attribute :avatar

    validates :current_user, :email, :password, :name, :role, presence: true
    validates :is_onboarding_finished, inclusion: {in: [true, false]}
    validates :role, inclusion: {in: User::ROLES}
    validate :email_uniqueness
    include Core::BaseValidator

    attr_reader :user

    def authorized?
      current_user.admin?
    end

    def process
      create_user
    end

    def broadcast_ok
      broadcast(:ok, user)
    end

    protected

    def create_user
      @user = User.create!(params)
    end

    def params
      attributes.except(:current_user)
    end

    def email_uniqueness
      errors.add(:email, :taken) if User.exists?(email: params[:email])
    end
  end
end
