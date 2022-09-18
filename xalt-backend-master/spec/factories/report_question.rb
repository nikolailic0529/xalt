# frozen_string_literal: true

FactoryBot.define do
  factory :report_question do
    question_type { 'rating' }
    title         { Faker::Name.name }
  end
end
