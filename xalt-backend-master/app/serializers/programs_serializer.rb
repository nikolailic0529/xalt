# frozen_string_literal: true

class ProgramsSerializer < ActiveModel::Serializer
  type :programs
  attributes :id, :name, :description, :program_date, :type, :completed, :created_at

  belongs_to :coach_profile, serializer: Coaches::ProfilesSerializer
  belongs_to :member_profile, serializer: Members::ProfilesSerializer
  has_many :program_exercises, serializer: ProgramExercisesSerializer
end
