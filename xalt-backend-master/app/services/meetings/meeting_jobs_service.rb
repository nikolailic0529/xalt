# frozen_string_literal: true

class Meetings::MeetingJobsService < Core::BaseService
  attribute :create_meeting_jobs, Boolean, default: false
  attribute :delete_meeting_jobs, Boolean, default: false
  attribute :meeting_id, String

  def call
    meeting = Meeting.find(meeting_id)
    destroy_old_jobs(meeting) if delete_meeting_jobs
    create_jobs(meeting) if create_meeting_jobs
  end

  private

  def create_jobs(meeting)
    BackgroundJobs::Create.call(meeting_params(meeting)[:create_report_job])
    BackgroundJobs::Create.call(meeting_params(meeting)[:create_mark_as_finished_job])
    create_email_notification_job(meeting)
  end

  def meeting_params(meeting)
    {
      create_report_job:           {
        wait_until: meeting.time_from - 10.minutes,
        job_name:   'CreateReportJob',
        arguments:  {meeting_id: meeting.id}
      },
      create_billing_record_job:   {
        wait_until: meeting.time_to,
        job_name:   'CreateBillingRecordJob',
        arguments:  {meeting_id: meeting.id}
      },
      create_mark_as_finished_job: {
        wait_until: meeting.time_to,
        job_name:   'MarkMeetingAsFinishedJob',
        arguments:  {meeting_id: meeting.id}
      },
      email_for_coach_job:         {
        wait_until: meeting.time_from - 10.minutes,
        job_name:   'Notifications::EmailNotificationJob',
        arguments:  {meeting_id: meeting.id, user: meeting.coach_profile.user, delayed_email: true, meeting: meeting}
      },
      email_for_member_job:        {
        wait_until: meeting.time_from - 10.minutes,
        job_name:   'Notifications::EmailNotificationJob',
        arguments:  {meeting_id: meeting.id, user: meeting.member_profile.user, delayed_email: true, meeting: meeting}
      }
    }
  end

  def create_email_notification_job(meeting)
    setting = EmailNotificationsSettingsService.call(type: 'Notification::UpcomingMeeting')
    # rubocop:disable Style/MultilineIfModifier
    BackgroundJobs::Create
      .call(meeting_params(meeting)[:email_for_coach_job]) if meeting.coach_profile
                                                                     .user
                                                                     .email_notifications_settings[setting]

    BackgroundJobs::Create
      .call(meeting_params(meeting)[:email_for_member_job]) if meeting.member_profile
                                                                      .user
                                                                      .email_notifications_settings[setting]
    # rubocop:enable Style/MultilineIfModifier
  end

  def destroy_old_jobs(meeting)
    background_jobs = BackgroundJob.where('arguments @> ?', {meeting_id: meeting.id}.to_json)
                                   .where(status: %i[running pending])

    active_job_ids = background_jobs.pluck(:active_job_id)
    ss = Sidekiq::ScheduledSet.new
    ss.select do |job|
      job_id = job.args.first.fetch('job_id')
      BackgroundJob.find_by(active_job_id: job_id).update!(status: :canceled) if active_job_ids.include?(job_id)
      job.delete if active_job_ids.include?(job_id)
    end
  end
end
