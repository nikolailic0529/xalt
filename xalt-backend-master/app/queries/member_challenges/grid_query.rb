# frozen_string_literal: true

module MemberChallenges
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :user_id, String
    attribute :category, String
    attribute :is_competition, Virtus::JsonapiBooleanFilterAttributes

    def base_relation
      MemberChallenges::BaseQuery.call(current_user: current_user)
                                 .joins(:user)
                                 .merge(member_filter)
    end

    private

    def execute
      self.relation = relation.where(category: category) if category.present?
      self.relation = relation.where(is_competition: is_competition) if is_competition.present?
    end

    def member_filter
      MemberChallenges::Filters::MemberFilter.call(updated_attributes.except(:inclusions))
    end
  end
end
