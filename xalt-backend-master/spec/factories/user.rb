# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email     { Faker::Internet.email }
    password  { 'Faker::Internet.password(min_length: 8)' }
    name      { Faker::Name.name }
    role      { 'member' }
    stripe    { {stripe_id: 'cus_123', stripe_card_last4: '4242'} }

    trait :admin do
      email     { Faker::Internet.email }
      password  { 'password' }
      name      { 'Admin' }
      role      { 'admin' }
    end

    trait :coach do
      email     { Faker::Internet.email }
      password  { 'password' }
      name      { 'Coach' }
      role      { 'coach' }
      stripe    { {stripe_account_id: 'acc_123'} }

      transient do
        fitnes_domains { [] }
        subscription { nil }
      end

      coach_profile { build(:coach_profile, fitnes_domains: fitnes_domains) }
    end

    trait :member do
      email     { Faker::Internet.email }
      password  { 'password' }
      name      { 'Member' }
      role      { 'member' }
      stripe    {
        {stripe_id:            'cus_123',
         stripe_card_last4:    '4242',
         current_period_start: (Time.zone.now - 2.months).to_datetime.to_i,
         current_period_end:   (Time.zone.now + 2.months).to_datetime.to_i}
      }

      transient do
        fitnes_domains { [] }
        subscription { nil }
        coach_profile { nil }
      end

      member_profile {
        build(:member_profile, fitnes_domains: fitnes_domains, subscription: subscription, coach_profile: coach_profile)
      }
    end
  end
end
