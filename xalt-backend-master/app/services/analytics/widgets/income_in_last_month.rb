# frozen_string_literal: true

module Analytics
  module Widgets
    class IncomeInLastMonth < Analytics::BaseWidget
      def call
        BillingRecords::GridQuery.call(current_user: current_user,
                                       pagination:   false,
                                       ordering:     false,
                                       time_from:    DateTime.now.prev_month.beginning_of_month,
                                       time_to:      DateTime.now.prev_month.end_of_month)
                                 .select('coach_profiles.user_id as id', 'SUM(amount) as value')
                                 .group('coach_profiles.user_id')
                                 .as_json
      end
    end
  end
end
