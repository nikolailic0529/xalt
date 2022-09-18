# frozen_string_literal: true

FactoryBot.define do
  factory :coach_profile do
    about { "I'm perfect Coach" }
    social_network_links { {'linkedin'=>'https://linkedin.com/stub'} }
    earnings { 0.0 }
  end
end
