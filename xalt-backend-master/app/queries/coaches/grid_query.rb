# frozen_string_literal: true

module Coaches
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :type, String

    def base_relation
      Coaches::BaseQuery.call(current_user: current_user, type: type)
    end
  end
end
