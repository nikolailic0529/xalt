# frozen_string_literal: true

FactoryBot.define do
  factory :report do
    coach_profile       { create(:coach_profile, user: create(:user, :coach)) }
    member_profile      { create(:member_profile, user: create(:user, :member)) }
    summary             { 'summary' }
    additional_comments { 'commentary' }
  end
end
