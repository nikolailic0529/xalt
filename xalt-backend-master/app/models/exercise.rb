# frozen_string_literal: true

class Exercise < ApplicationRecord
  DIFFICULTIES = %w[advanced intermediate beginner].freeze
  CATEGORIES = %w[isolated_muscle_group upper_body lower_body full_body compound_muscle_group core].freeze
  EQUIPMENTS = %w[dumbbells resistance_bands_handles resistance_bands_loops box barbell chair mat balance_board bench
                  body_weight cable foam_roller jump_rope kettlebell medicine_ball push_up_bar slam_ball sliders].freeze
  PACES = %w[slow normal fast].freeze

  belongs_to :user
  has_many :program_exercises
  has_many :vote_record

  # PG_Search
  include PgSearch::Model
  multisearchable against: %i[name]
  pg_search_scope :search, against: %i[name], using: {tsearch: {prefix: true}}
end
