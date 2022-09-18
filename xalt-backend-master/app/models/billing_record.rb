# frozen_string_literal: true

class BillingRecord < ApplicationRecord
  PERCENT_FEE = 30

  belongs_to :meeting, optional: true
  belongs_to :subscription, optional: true
  belongs_to :coach_profile, optional: true
  belongs_to :member_profile, optional: true
end
