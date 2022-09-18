# frozen_string_literal: true

class CoachProfile < ApplicationRecord
  belongs_to :user

  has_many :coach_fitnes_domains
  has_many :fitnes_domains, through: :coach_fitnes_domains
  has_many :member_profiles
  has_many :members, through: :member_profiles, source: :user
  has_many :meetings
  has_many :programs
  has_many :reports
  has_many :coach_documents
end
