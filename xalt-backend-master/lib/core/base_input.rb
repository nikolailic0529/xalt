# frozen_string_literal: true

require 'virtus'

class Core::BaseInput
  extend  ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations
  include Virtus.model
  include Core::Helpers::PartiallyUpdatableAttributes

  def persisted?
    false
  end
end
