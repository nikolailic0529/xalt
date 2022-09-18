# frozen_string_literal: true

class Subscription < ApplicationRecord
  self.inheritance_column = :_type_disabled

  TYPE = %w[monthly annual].freeze
  STRIPE_INTERVAL = {monthly: 'month', annual: 'year'}.freeze

  def amount_per_meeting
    amount / sessions_count
  end
end
