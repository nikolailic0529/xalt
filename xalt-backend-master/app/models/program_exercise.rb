# frozen_string_literal: true

class ProgramExercise < ApplicationRecord
  belongs_to :program
  belongs_to :exercise, optional: true
end
