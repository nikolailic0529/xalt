# frozen_string_literal: true

class Notifications::CreateNotificationJob < Core::BaseJob
  queue_as :create_notification

  def perform(params)
    Notification.create!(params.except!(:background_job_id))
    EmailNotificationsService.call(params)
  end
end
