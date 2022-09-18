# frozen_string_literal: true

module BillingRecords
  module Filters
    class TimeRangeFilter < Core::BaseQuery
      attribute :time_from
      attribute :time_to

      def base_relation
        BillingRecord.joins(:coach_profile).all
      end

      private

      def execute
        self.relation = relation.where(billing_record_arel_table[:created_at].gteq(time_from))
        self.relation = relation.where(billing_record_arel_table[:created_at].lteq(time_to))
      end

      def billing_record_arel_table
        @billing_record_arel_table ||= BillingRecord.arel_table
      end
    end
  end
end
