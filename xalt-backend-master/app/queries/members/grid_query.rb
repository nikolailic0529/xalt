# frozen_string_literal: true

module Members
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User

    def base_relation
      Members::BaseQuery.call(current_user: current_user)
    end
  end
end
