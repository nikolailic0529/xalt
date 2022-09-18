# frozen_string_literal: true

module Subscriptions
  class GridQuery < Core::Queries::GridQuery
    attribute :type, String

    def base_relation
      Subscriptions::BaseQuery.call
    end

    def execute
      self.relation = relation.where(type: type) if type.present?
    end
  end
end
