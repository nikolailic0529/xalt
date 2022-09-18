# frozen_string_literal: true

class Core::BaseQuery < Core::BaseInput
  # This attribute is called relation after Active Model Relation class
  attr_writer :relation

  def self.call(options={})
    new(options).call
  end

  def call
    execute_defaults
    execute
    relation
  end

  def base_relation
    # Define the original scope for the query
    #
    # Example:
    #   model_for(:user)
    #
    raise 'Undefined Method'
  end

  def execute
    # This method is user to perform all necessary updates on self.result.
    # It may contain calls to filter methods or updating scope by user visibility.
    #
    # Example:
    #   self.relation = self.relation.where(status: status) if filter_by_status?
    #
  end

  def execute_defaults
    # Perform default changes for releation here
    #
    self.relation = include_relationships if inclusions.present?
  end

  attribute :inclusions, Array[Symbol]

  protected

  def relation
    @relation ||= base_relation
  end

  def include_relationships
    relation.includes(inclusions)
  end

  def updated_query_attributes
    updated_attributes.except(:inclusions)
  end
end
