# frozen_string_literal: true

module Reports
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :is_filled, Virtus::JsonapiBooleanFilterAttributes
    attribute :member_id, String

    def base_relation
      Reports::BaseQuery.call(current_user: current_user)
    end

    private

    def execute
      self.relation = relation.where(is_filled: is_filled) if is_filled.present? || is_filled == false
      self.relation = relation.where(member_profiles: {users: {id: member_id}}) if member_id.present?
      # self.relation = relation.merge(members_filter) if search_string.present?
    end

    def members_filter
      Members::GridQuery.call(updated_attributes.merge(pagination: false, ordering: false))
    end
  end
end
