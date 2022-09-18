# frozen_string_literal: true

module Coaches
  module Reports
    class Create < Core::BaseCommand
      attribute :current_user, User
      attribute :summary, String
      attribute :additional_comments, String
      attribute :meeting, Meeting
      attribute :member_profile, MemberProfile
      attribute :coach_profile, CoachProfile
      attribute :questions, Array[ReportQuestion]

      validates :member_profile, :coach_profile, :meeting, presence: true
      validate :report_for_this_meeting_already_exists
      include Core::BaseValidator

      attr_reader :report

      def authorized?
        current_user.admin?
      end

      def process
        Report.transaction do
          create_report
          create_answers
          check_report_is_filled
        end
      end

      def broadcast_ok
        broadcast(:ok, report)
      end

      protected

      def create_report
        @report = Report.create!(params)
      end

      def params
        updated_attributes.except!(:current_user)
      end

      def create_answers
        questions.each do |item|
          report.report_answers.create!(report_question: item, score: 0) if item.question_type == 'rating'
          report.report_answers.create!(report_question: item, answer: '') if item.question_type == 'no_rating'
        end
      end

      def check_report_is_filled
        Notifications::CheckReportIsFilledJob
          .set(wait_until: report.created_at.next_day).perform_later(report.id)
      end

      def report_for_this_meeting_already_exists
        errors.add(:report, :report_for_this_meeting_already_exists) if meeting.report
      end
    end
  end
end
