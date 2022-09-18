# frozen_string_literal: true

class Meeting < ApplicationRecord
  belongs_to :coach_profile
  belongs_to :member_profile
  belongs_to :program
  has_one :report
end
