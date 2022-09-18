# frozen_string_literal: true

class FitnesDomain < ApplicationRecord
  has_many :coach_fitnes_domains
  has_many :coaches, through: :coach_fitnes_domains, source: :coach_profile

  has_many :member_fitnes_domains
  has_many :members, through: :member_fitnes_domains, source: :member_profile
end
