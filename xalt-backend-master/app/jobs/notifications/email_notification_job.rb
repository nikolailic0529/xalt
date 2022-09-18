# frozen_string_literal: true

class Notifications::EmailNotificationJob < Core::BaseJob
  queue_as :mailers

  def perform(params)
    if params[:delayed_email]
      UserMailer.send_email_notification_about_meeting(params).deliver
    else
      UserMailer.send_email_notification(params).deliver
    end
  end
end
