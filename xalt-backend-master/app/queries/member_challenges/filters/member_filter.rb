# frozen_string_literal: true

module MemberChallenges
  module Filters
    class MemberFilter < Core::BaseQuery
      attribute :user_id, String

      def base_relation
        User.where(role: %w[member admin])
      end

      private

      def execute
        self.relation = relation.where(id: user_id) if user_id.present?
      end
    end
  end
end
