# frozen_string_literal: true

module Exercises
  module Filters
    class CoachFilter < Core::BaseQuery
      attribute :coach_id, String

      def base_relation
        User.where(role: %w[coach admin])
      end

      private

      def execute
        self.relation = relation.where(id: coach_id) if coach_id.present?
      end
    end
  end
end
