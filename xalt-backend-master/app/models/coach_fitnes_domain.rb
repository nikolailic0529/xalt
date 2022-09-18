# frozen_string_literal: true

class CoachFitnesDomain < ApplicationRecord
  belongs_to :fitnes_domain
  belongs_to :coach_profile
end
