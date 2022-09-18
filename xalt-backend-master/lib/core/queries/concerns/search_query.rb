# frozen_string_literal: true

require 'active_support/concern'

module Core::Queries::Concerns::SearchQuery
  extend ActiveSupport::Concern

  included do
    attribute :search_string, String
  end

  def execute_defaults
    if search_string.present? && relation.respond_to?(:search)
      self.relation = relation.search(search_string).with_pg_search_rank
    end
    super
  end
end
