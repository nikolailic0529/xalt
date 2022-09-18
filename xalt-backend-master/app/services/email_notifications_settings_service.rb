# frozen_string_literal: true

class EmailNotificationsSettingsService < Core::BaseService
  attribute :type

  def call
    email_notifications_settings[type.to_sym]
  end

  private

  def email_notifications_settings
    {
      'Notification::CompleteHomeworkNotification': 'member_completed_homework',
      'Notification::NewHomeworkNotification':      'new_homework',
      'Notification::NewMemberNotification':        'new_member',
      'Notification::NewMeetingNotification':       'new_meeting',
      'Notification::ExpiredReportNotification':    'expired_report',
      'Notification::TodayHomeworkNotification':    'today_homework',
      'Notification::UpcomingMeeting':              'upcoming_meeting'
    }
  end
end
