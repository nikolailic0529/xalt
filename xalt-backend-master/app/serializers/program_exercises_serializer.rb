# frozen_string_literal: true

class ProgramExercisesSerializer < ActiveModel::Serializer
  type :program_exercises
  attributes :id, :sets, :repetitions, :repetitions_duration, :exercise_id, :link_url

  belongs_to :program, serializer: ::ProgramsSerializer
  belongs_to :exercise, serializer: ::ExerciseSerializer
end
