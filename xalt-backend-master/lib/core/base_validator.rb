# frozen_string_literal: true

module Core
  module BaseValidator
    extend ActiveSupport::Concern

    included do
      validates_each new.attributes.keys do |record, attr, value|
        # record.validates_length_of(attr, maximum: 100) if value.is_a?(String) &&
        #   %i[content description summary additional_comments].exclude?(attr)
        record.validates_length_of(attr, maximum: 4000) if value.is_a?(String) && %i[content description].include?(attr)
        record.validates_length_of(attr, maximum: 1000) if value.is_a?(String) && %i[summary
                                                                                     additional_comments].include?(attr)
        record.validates_length_of(attr, in: 0..2_147_483_647) if value.is_a?(Integer)
      end
    end
  end
end
