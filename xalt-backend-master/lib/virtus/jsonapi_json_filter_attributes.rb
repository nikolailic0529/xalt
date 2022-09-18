# frozen_string_literal: true

class Virtus::JsonapiJsonFilterAttributes < Virtus::Attribute
  def coerce(value)
    return nil if value.nil?

    value.is_a?(::Hash) ? value.with_indifferent_access : JSON.parse(value)
  end
end
