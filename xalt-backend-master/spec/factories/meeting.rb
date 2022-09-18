# frozen_string_literal: true

FactoryBot.define do
  factory :meeting do
    time_to   { Time.zone.now + 20.minutes }
    time_from { Time.zone.now + 5.minutes }
    program   { create(:program, :session) }
  end
end
