# frozen_string_literal: true

module Analytics
  module Widgets
    class ConditionAssessmentByMember < Analytics::BaseWidget
      filters :sessions_limit, :member_profile_id, :report_question_id

      def call
        Meetings::GridQuery
          .call(widget_params.merge!(is_finished: true,
                                     sort:        {created_at: :asc},
                                     pagination:  true,
                                     page:        1,
                                     per_page:    widget_params[:sessions_limit].to_i))
          .joins(report: :report_answers)
          .where(report_answers: {report_question_id: widget_params[:report_question_id]})
          .select('report_answers.id as id', 'report_answers.score as score', 'reports.created_at as date')
          .order('reports.created_at asc')
          .as_json
      end
    end
  end
end
