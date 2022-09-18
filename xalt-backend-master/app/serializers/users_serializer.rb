# frozen_string_literal: true

class UsersSerializer < ActiveModel::Serializer
  type :users
  attributes :id, :email, :name, :role, :is_onboarding_finished, :avatar, :stripe,
             :terms_and_privacy_confirmed, :email_notifications_settings, :lesson_count, :subscription_type

  has_one :member_profile, serializer: Members::ProfilesSerializer
  has_one :coach_profile, serializer: Coaches::ProfilesSerializer
end
