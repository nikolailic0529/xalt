# frozen_string_literal: true

class CreateReportJob < Core::BaseJob
  queue_as :meetings

  def perform(params)
    meeting = Meeting.joins(:coach_profile, :member_profile).find(params[:meeting_id])
    create_report(meeting) unless meeting.report
  end

  def create_report(meeting)
    questions = ReportQuestion.all

    Report.transaction do
      report = Report.create!(
        meeting_id:        meeting.id,
        member_profile_id: meeting.member_profile.id,
        coach_profile_id:  meeting.coach_profile.id,
        questions:         questions
      )

      questions.each do |item|
        report.report_answers.create!(report_question: item, score: 0) if item.question_type == 'rating'
        report.report_answers.create!(report_question: item, answer: '') if item.question_type == 'no_rating'
      end

      BackgroundJobs::Create.call(
        {
          wait_until: report.created_at.next_day,
          job_name:   'Notifications::CheckReportIsFilledJob',
          arguments:  {report_id: report.id, meeting_id: meeting.id}
        }
      )

      meeting.update!(report_id: report.id)
    end
  end
end
