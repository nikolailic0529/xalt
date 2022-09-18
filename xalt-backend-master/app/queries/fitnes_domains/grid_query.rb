# frozen_string_literal: true

module FitnesDomains
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :fitnes_domain_ids, Virtus::JsonapiArrayFilterAttributes

    def base_relation
      FitnesDomains::BaseQuery.call(current_user: current_user)
    end

    def execute
      self.relation = relation.where(id: fitnes_domain_ids) if fitnes_domain_ids.present?
    end
  end
end
