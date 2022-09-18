# frozen_string_literal: true

class Notifications::CheckReportIsFilledJob < Core::BaseJob
  queue_as :meetings

  def perform(params)
    report = Report.find(params[:report_id])

    NotificationService.call(notification_params(report)) unless report.is_filled
  end

  def notification_params(report)
    {
      user_id:   report.coach_profile.user_id,
      type:      :expired_report,
      report_id: report.id
    }
  end
end
