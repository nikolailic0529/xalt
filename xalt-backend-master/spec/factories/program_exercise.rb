# frozen_string_literal: true

FactoryBot.define do
  factory :program_exercise do
    sets                 { 2 }
    repetitions          { 2 }
    repetitions_duration { 3 }
    exercise             { create(:exercise) }
    program              { create(:program, :homework) }
  end
end
