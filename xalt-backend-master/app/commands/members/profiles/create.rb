# frozen_string_literal: true

module Members
  module Profiles
    class Create < Core::BaseCommand
      attribute :current_user, User
      attribute :user, User
      attribute :hours_spend_last_week, Integer
      attribute :fitnes_domain_ids, Virtus::JsonapiArrayFilterAttributes
      attribute :subscription_id, String

      attribute :move_per_week_current, Integer
      attribute :move_per_week_plan, Integer
      attribute :exercise_places, Hash
      attribute :coach_gender_preference, Hash
      attribute :ideal_coach, Hash
      attribute :intensity_level, String
      attribute :rate_preference, String
      attribute :session_per_week, Integer
      attribute :measurements, Hash

      validates :current_user, :user, presence: true
      validate :member_profile_exists?
      include Core::BaseValidator

      attr_reader :member_profile

      def authorized?
        current_user.member? && current_user == user
      end

      def process
        create_member_profile
      end

      def broadcast_ok
        broadcast(:ok, member_profile)
      end

      protected

      def create_member_profile
        @member_profile = MemberProfile.create!(params)
      end

      def params
        updated_attributes.except(:current_user)
      end

      def member_profile_exists?
        return if current_user.member_profile.blank?

        errors.add(:member_profile, :member_profile_already_exists)
      end
    end
  end
end
