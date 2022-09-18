# frozen_string_literal: true

module Messages
  class GridQuery < Core::Queries::GridQuery
    include Core::Queries::Concerns::PaginatedQuery

    attribute :current_user, User
    attribute :conversation_id, String

    def base_relation
      Messages::BaseQuery.call(current_user: current_user)
    end

    def execute
      self.relation = relation.where(conversation_id: conversation_id) if conversation_id.present?
    end
  end
end
