# frozen_string_literal: true

class Virtus::JsonapiBooleanFilterAttributes < Virtus::Attribute
  def coerce(value)
    return nil if value.nil?

    ActiveRecord::Type::Boolean.new.cast(value)
  end
end
