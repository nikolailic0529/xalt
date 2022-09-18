# frozen_string_literal: true

FactoryBot.define do
  factory :report_answer do
    trait :rating do
      report          { create(:report) }
      report_question { create(:report_question) }
      score           { rand(1..10) }
    end

    trait :no_rating do
      report          { create(:report) }
      report_question { create(:report_question, question_type: 'no_rating') }
      answer          { 'yes' }
    end
  end
end
