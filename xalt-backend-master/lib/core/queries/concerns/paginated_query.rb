# frozen_string_literal: true

require 'active_support/concern'
require 'will_paginate/active_record'

module Core::Queries::Concerns::PaginatedQuery
  DEFAULT_PAGE_NUMBER = 1
  DEFAULT_PAGE_SIZE = 25

  extend ActiveSupport::Concern

  included do
    attribute :pagination, Virtus::JsonapiBooleanFilterAttributes, default: true

    attribute :page,       Integer, default: DEFAULT_PAGE_NUMBER
    attribute :per_page,   Integer, default: DEFAULT_PAGE_SIZE
  end

  def execute_defaults
    self.relation = paginate if pagination
    super
  end

  private

  def paginate
    relation.paginate(attributes.slice(:page, :per_page))
  end
end
