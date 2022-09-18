# frozen_string_literal: true

require 'active_support/concern'

module Core::Queries::Concerns::SortedQuery
  extend ActiveSupport::Concern

  included do
    attribute :sort, Hash, default: {created_at: :desc}
    attribute :ordering, Virtus::JsonapiBooleanFilterAttributes, default: true
  end

  def execute_defaults
    self.relation = sort_results if sort.present? && ordering
    super
  end

  def sort_results
    relation.order(sort_params_to_sql)
  end

  def nulls_last_ordering_fields
    []
  end

  private

  def sort_params_to_sql
    sort.map do |sort_key, sort_direction|
      if sort_key.in?(nulls_last_ordering_fields)
        "#{sort_key} #{sort_direction} NULLS LAST"
      else
        {sort_key => sort_direction}
      end
    end
  end
end
