# frozen_string_literal: true

module Core::Helpers
  module PartiallyUpdatableAttributes
    extend ActiveSupport::Concern

    attr_accessor :original_attributes

    def updated_attributes_names
      @updated_attributes_names ||= begin
        symbolized_original_keys = original_attributes.keys.map(&:to_sym)
        respond_to?(:attributes) ? (symbolized_original_keys & attributes.keys) : symbolized_original_keys
      end
    end

    def attribute_changed?(attr_name)
      updated_attributes_names.include?(attr_name.to_sym)
    end

    def updated_attributes
      @updated_attributes ||= updated_attributes_names.index_with do |attr_name|
        send(attr_name)
      end.compact
    end

    module Initializer
      def initialize(attrs={})
        @original_attributes = attrs || {}
        super attrs
      end
    end

    included do
      prepend Initializer
    end
  end
end
