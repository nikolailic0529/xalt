# frozen_string_literal: true

module Programs
  module Filters
    class TimeRangeFilter < Core::BaseQuery
      attribute :time_from
      attribute :time_to

      def base_relation
        Program.all
      end

      private

      def execute
        self.relation = relation.where(program_arel_table[:program_date].gteq(time_from)) if time_from.present?
        self.relation = relation.where(program_arel_table[:program_date].lteq(time_to)) if time_to.present?
      end

      def program_arel_table
        @program_arel_table ||= Program.arel_table
      end
    end
  end
end
