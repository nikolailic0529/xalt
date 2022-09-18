# frozen_string_literal: true

module Reports
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Report.joins(joins_args).distinct if current_user.admin?
      return current_user.coach_profile.reports.joins(joins_args).distinct if current_user.coach?

      Report.none
    end

    private

    def joins_args
      [{member_profile: :user}, :questions, :report_answers]
    end
  end
end
