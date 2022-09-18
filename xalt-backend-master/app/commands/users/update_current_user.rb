# frozen_string_literal: true

module Users
  class UpdateCurrentUser < Core::BaseCommand
    attribute :current_user, User
    attribute :email, String
    attribute :name, String
    attribute :role, String
    attribute :is_onboarding_finished, Virtus::JsonapiBooleanFilterAttributes
    attribute :avatar
    attribute :email_notifications_settings, Virtus::JsonapiJsonFilterAttributes
    attribute :lesson_count, Integer
    attribute :subscription_type, String

    validates :current_user, presence: true
    validates :role, inclusion: {in: (User::ROLES - ['admin'])}, if: -> { role.present? }
    validate :role_cant_be_changed
    validate :onboarding_cant_be_changed
    validate :notification_settings_should_match_to_role, if: -> { email_notifications_settings.present? }
    validate :email_uniqueness, if: -> { email.present? }

    include Core::BaseValidator

    def authorized?
      true
    end

    def process
      User.transaction do
        update_user
        update_notification_setting if email_notifications_settings.present?
        upload_avatar if avatar.present?
        current_user.reload
      end
    end

    def broadcast_ok
      broadcast(:ok, current_user)
    end

    protected

    def upload_avatar
      current_user.avatar.store!
    end

    def update_user
      current_user.update!(params)
    end

    def params
      updated_attributes.except(:current_user, :email_notifications_settings)
    end

    def update_notification_setting
      email_notifications_settings.first.each do |key, value|
        current_user.email_notifications_settings[key] = to_boolean(value)
      end
      current_user.save
    end

    def role_cant_be_changed
      errors.add(:role, :role_cant_be_changed) if current_user.role.present? && role.present?
    end

    def onboarding_cant_be_changed
      return unless current_user.is_onboarding_finished? && is_onboarding_finished.to_s == 'false'

      errors.add(:is_onboarding_finished, :onboarding_cant_be_changed)
    end

    def notification_settings_should_match_to_role
      email_notifications_settings.first.each_key do |key|
        if (User::COACH_NOTIFICATION_LIST).exclude?(key) && current_user.coach?
          errors.add(:email_notifications_settings,
                     :should_match_to_role)
        end
        if (User::MEMBER_NOTIFICATION_LIST).exclude?(key) && current_user.member?
          errors.add(:email_notifications_settings,
                     :should_match_to_role)
        end
      end
    end

    def email_uniqueness
      errors.add(:email, :taken) if User.exists?(email: params[:email])
    end
  end
end
