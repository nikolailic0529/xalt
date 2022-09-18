# frozen_string_literal: true

class Virtus::String < Virtus::Attribute
  def coerce(value)
    return nil if value.nil?

    value.strip
  end
end
