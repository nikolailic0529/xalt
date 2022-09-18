# frozen_string_literal: true

module Meetings
  module Filters
    class TimeRangeFilter < Core::BaseQuery
      attribute :time_from
      attribute :time_to

      def base_relation
        Meeting.all
      end

      private

      def execute
        self.relation = relation.where(meeting_arel_table[:time_from].gteq(time_from)) if time_from.present?
        self.relation = relation.where(meeting_arel_table[:time_to].lteq(time_to)) if time_to.present?
      end

      def meeting_arel_table
        @meeting_arel_table ||= Meeting.arel_table
      end
    end
  end
end
