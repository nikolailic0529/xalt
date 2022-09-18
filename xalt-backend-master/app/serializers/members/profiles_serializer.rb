# frozen_string_literal: true

class Members::ProfilesSerializer < ActiveModel::Serializer
  type :members_profiles
  attributes :id, :hours_spend_last_week, :coach_profile_id, :subscription_id, :move_per_week_current,
             :move_per_week_plan, :exercise_places, :coach_gender_preference, :ideal_coach, :intensity_level,
             :rate_preference, :session_per_week, :coach_profile, :measurements

  belongs_to :user, serializer: ::UsersSerializer
  has_many :fitnes_domains, serializer: ::FitnesDomainsSerializer
  has_one :subscription, serializer: ::SubscriptionsSerializer
  has_many :reports, serializer: ::Coaches::ReportSerializer
  belongs_to :coach_profile, serializer: Coaches::ProfilesSerializer
end
