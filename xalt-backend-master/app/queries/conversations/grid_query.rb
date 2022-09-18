# frozen_string_literal: true

module Conversations
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User

    def base_relation
      Conversations::BaseQuery.call(current_user: current_user)
    end
  end
end
