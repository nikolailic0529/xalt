# frozen_string_literal: true

class Program < ApplicationRecord
  belongs_to :coach_profile
  belongs_to :member_profile

  has_many :program_exercises
  has_many :meetings

  # PG_Search
  include PgSearch::Model
  multisearchable against: %i[name]
  pg_search_scope :search, against: %i[name], using: {tsearch: {prefix: true}}

  TYPES = ActiveSupport::HashWithIndifferentAccess.new({homework: Program::HomeworkProgram,
                                                        session:  Program::SessionProgram}).freeze
end
