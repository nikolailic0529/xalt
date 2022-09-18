# frozen_string_literal: true

FactoryBot.define do
  factory :billing_record do
    coach_profile { create(:coach_profile, user: create(:user, :coach)) }
    amount { 10 }
    subscription { create(:subscription) }
    direction { 'incoming' }
  end
end
