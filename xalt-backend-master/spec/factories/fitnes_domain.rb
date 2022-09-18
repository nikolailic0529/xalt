# frozen_string_literal: true

FactoryBot.define do
  factory :fitnes_domain do
    name  { Faker::Name.name }
    coach_domain_name { Faker::Name.name }
    member_goal_name { Faker::Name.name }
  end
end
