# frozen_string_literal: true

module BillingRecords
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :time_from, DateTime, default: DateTime.now.beginning_of_month
    attribute :time_to, DateTime, default: DateTime.now.end_of_month

    def base_relation
      BillingRecords::BaseQuery.call(current_user: current_user).where(direction: 'incoming').merge(time_range_filter)
    end

    private

    def time_range_filter
      BillingRecords::Filters::TimeRangeFilter.call(time_from: time_from, time_to: time_to)
    end
  end
end
