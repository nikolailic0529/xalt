# frozen_string_literal: true

class EmailReportService < Core::BaseService
  attribute :report_id

  # TODO: refactor to get correct question and answers. currently using static question id.
  # rubocop:disable Metrics/AbcSize
  def call
    report = Report.find(report_id)

    answer = {
      physical_fitness_level: '0%',
      quality_of_sleep:       '0%',
      stress_levels:          '0%',
      quality_of_diet:        '0%',
      overall_happiness:      '0%',
      level_of_community:     '0%',
    }

    physical_fitness_level = report.report_answers.find_by(report_question_id: '70a09039-294a-4dfd-a756-b92603f00e30')
    quality_of_sleep = report.report_answers.find_by(report_question_id: '9a4c6fe2-d75a-48d6-a09b-b3548cb9f882')
    stress_levels = report.report_answers.find_by(report_question_id: 'bfba2dff-627b-4f50-98fc-f53c39afa586')
    quality_of_diet = report.report_answers.find_by(report_question_id: '7ac7021d-fd89-407f-a71d-e2d058eac0a5')
    overall_happiness = report.report_answers.find_by(report_question_id: 'e412cca8-e11a-4ac0-b488-040994615b10')
    level_of_community = report.report_answers.find_by(report_question_id: '825dda53-6267-4cc9-a5e7-c1e420bbd7eb')

    answer[:physical_fitness_level] = "#{physical_fitness_level.score * 10}%" if physical_fitness_level.present?
    answer[:quality_of_sleep] = "#{quality_of_sleep.score * 10}%" if quality_of_sleep.present?
    answer[:stress_levels] = "#{stress_levels.score * 10}%" if stress_levels.present?
    answer[:quality_of_diet] = "#{quality_of_diet.score * 10}%" if quality_of_diet.present?
    answer[:overall_happiness] = "#{overall_happiness.score * 10}%" if overall_happiness.present?
    answer[:level_of_community] = "#{level_of_community.score * 10}%" if level_of_community.present?

    meeting_time =
      "#{report.meeting.time_from.to_formatted_s(:long_ordinal)} - #{report.meeting.time_to.to_formatted_s(:time)}"

    Notifications::EmailReportJob.perform_later(email_params(report, answer, meeting_time))
  end
  # rubocop:enable Metrics/AbcSize

  private

  def email_params(report, answer, meeting_time)
    {
      user:         report.member_profile.user,
      coach:        report.coach_profile.user,
      meeting_time: meeting_time,
      report:       {
        summary:            report.summary,
        additional_comment: report.additional_comments
      },
      answer:       answer
    }
  end
end
