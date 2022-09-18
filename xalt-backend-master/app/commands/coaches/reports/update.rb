# frozen_string_literal: true

module Coaches
  module Reports
    class Update < Core::BaseCommand
      attribute :current_user, User
      attribute :summary, String
      attribute :additional_comments, String
      attribute :report, Report
      attribute :answers, Virtus::JsonapiJsonFilterAttributes

      validate :score_must_be_from_one_to_ten, if: -> { answers.present? }
      validate :answer_must_be_valid, if: -> { answers.present? }
      include Core::BaseValidator

      def authorized?
        current_user.coach? || current_user.admin?
      end

      def process
        Report.transaction do
          update_report
          update_answers if answers.present?
          filled! if answers.present?
          send_email_report
        end

        report.reload
      end

      def broadcast_ok
        broadcast(:ok, report)
      end

      protected

      def send_email_report
        EmailReportService.call(report_id: report.id)
      end

      def update_report
        report.update!(params)
      end

      def filled!
        report.update!(is_filled: true)

        BackgroundJobs::Create.call(
          {
            job_name:  'CreateBillingRecordJob',
            arguments: {meeting_id: report.meeting.id}
          }
        )
      end

      def params
        updated_attributes.except!(:current_user, :report, :answers)
      end

      def update_answers
        answers.each do |item|
          answer = report.report_answers.find_by(report_question_id: item['report_question_id'])
          answer&.update!(score: item['score'], answer: item['answer'])
        end
      end

      def answer_must_be_valid
        no_rating_arr = answers.pluck('answer').delete_if { |i| i.nil? || ReportQuestion::ANSWERS.exclude?(i.downcase) }
        errors.add(:answers, :must_be_valid) unless no_rating_arr.length == 1
      end

      def score_must_be_from_one_to_ten
        rating_arr = answers.pluck('score').delete_if { |i| i.nil? || i.to_i < 1 || i.to_i > 10 }
        errors.add(:answers, :must_be_from_one_to_ten) unless rating_arr.length == 6
      end
    end
  end
end
