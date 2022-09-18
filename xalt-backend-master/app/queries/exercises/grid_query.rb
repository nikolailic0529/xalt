# frozen_string_literal: true

module Exercises
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :coach_id, String
    attribute :difficulty, String
    attribute :categorie, String
    attribute :equipment, String
    attribute :is_competition, Virtus::JsonapiBooleanFilterAttributes

    def base_relation
      Exercises::BaseQuery.call(current_user: current_user)
                          .joins(:user)
                          .merge(coach_filter)
    end

    private

    def execute
      self.relation = relation.where(difficulty: difficulty) if difficulty.present?
      self.relation = relation.where(categorie: categorie) if categorie.present?
      self.relation = relation.where(equipment: equipment) if equipment.present?
      self.relation = relation.where(is_competition: is_competition) if is_competition.present?
    end

    def coach_filter
      Exercises::Filters::CoachFilter.call(updated_attributes.except(:inclusions))
    end
  end
end
