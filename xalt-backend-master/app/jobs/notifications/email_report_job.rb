# frozen_string_literal: true

class Notifications::EmailReportJob < Core::BaseJob
  queue_as :mailers

  def perform(params)
    UserMailer.send_report_notification(params).deliver
  end
end
