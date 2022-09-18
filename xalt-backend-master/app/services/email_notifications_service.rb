# frozen_string_literal: true

class EmailNotificationsService < Core::BaseService
  attribute :user_id
  attribute :type
  attribute :content

  def call
    user = User.find(user_id)
    setting = EmailNotificationsSettingsService.call(type: type)
    Notifications::EmailNotificationJob.perform_later(email_params(user)) if user.email_notifications_settings[setting]
  end

  private

  def email_params(user)
    {
      user:    user,
      content: content
    }
  end
end
