# frozen_string_literal: true

FactoryBot.define do
  factory :program do
    trait :homework do
      name           { Faker::Name.name }
      description    { Faker::Name.name }
      coach_profile  { create(:coach_profile, user: create(:user, :coach)) }
      member_profile { create(:member_profile, user: create(:user, :member)) }
      type           { Program::HomeworkProgram }
      program_date   { Time.zone.now + 1.hour }
    end

    trait :session do
      name           { Faker::Name.name }
      description    { Faker::Name.name }
      coach_profile  { create(:coach_profile, user: create(:user, :coach)) }
      member_profile { create(:member_profile, user: create(:user, :member)) }
      type           { Program::SessionProgram }
      program_date   { Time.zone.now + 1.hour }
    end
  end
end
