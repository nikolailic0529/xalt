# frozen_string_literal: true

FactoryBot.define do
  factory :notification do
    trait :completed_homework do
      content { 'Completed Homework' }
      type { 'Notification::CompleteHomeworkNotification' }
      user { create(:user, :coach) }
      additional_info { {member_profile_id: '111'} }
    end

    trait :new_homework do
      content { 'New Homework' }
      type { 'Notification::NewHomeworkNotification' }
      user { create(:user, :member) }
      additional_info { {member_profile_id: '111'} }
    end

    trait :new_member do
      content { 'New Member' }
      type { 'Notification::NewMemberNotification' }
      user { create(:user, :coach) }
      additional_info { {member_profile_id: '111'} }
    end
  end
end
