# frozen_string_literal: true

FactoryBot.define do
  factory :subscription do
    description    { 'Some description' }
    sessions_count { 4 }
    type           { 'monthly' }
    amount { 1.0 }
    stripe_price_id { nil }
    additional_information { 'information' }
  end
end
