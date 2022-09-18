# frozen_string_literal: true

class NotificationService < Core::BaseService
  attribute :user_id
  attribute :type
  attribute :notification_sender
  attribute :time, Date, default: Time.zone.now
  attribute :member_profile_id
  attribute :coach_profile_id
  attribute :report_id
  attribute :program_id
  attribute :program_date

  def call
    BackgroundJobs::Create.call(
      {
        job_name:  'Notifications::CreateNotificationJob',
        arguments: notification_params[type]
      }
    )
  end

  private

  def notification_params
    {
      complete_homework: {user_id:         user_id,
                          type:            'Notification::CompleteHomeworkNotification',
                          content:         "#{notification_sender} completed homework",
                          additional_info: {member_profile_id: member_profile_id, member_name: notification_sender,
                          program_date:    program_date}},
      new_homework:      {user_id:         user_id,
                          type:            'Notification::NewHomeworkNotification',
                          content:         'Your coach add a new homework',
                          additional_info: {coach_profile_id: coach_profile_id, program_date: program_date}},
      new_member:        {user_id:         user_id,
                          type:            'Notification::NewMemberNotification',
                          content:         "#{notification_sender} has choosen you to be a coach!",
                          additional_info: {member_profile_id: member_profile_id, member_name: notification_sender}},
      new_meeting:       {user_id:         user_id,
                          type:            'Notification::NewMeetingNotification',
                          content:         "Your coach scheduled a new meeting with you on #{formated_time(time)}",
                          additional_info: {coach_profile_id: coach_profile_id, meeting_time: time}},
      expired_report:    {user_id:         user_id,
                          type:            'Notification::ExpiredReportNotification',
                          content:         'You have unfilled report from yesterday',
                          additional_info: {report_id: report_id}},
      today_homework:    {user_id:         user_id,
                          type:            'Notification::TodayHomeworkNotification',
                          content:         "You have homework for today! Don't forget do it!",
                          additional_info: {program_id: program_id}}

    }
  end

  def formated_time(time)
    time.strftime('%I:%M %p %B %d')
  end
end
