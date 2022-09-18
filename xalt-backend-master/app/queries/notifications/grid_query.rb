# frozen_string_literal: true

module Notifications
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User

    def base_relation
      Notifications::BaseQuery.call(current_user: current_user)
    end
  end
end
