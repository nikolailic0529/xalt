# frozen_string_literal: true

class Virtus::JsonapiArrayFilterAttributes < Virtus::Attribute
  def coerce(value)
    return nil if value.nil?

    value.is_a?(::Array) ? value : value.split(',')
  end
end
