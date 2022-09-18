# frozen_string_literal: true

module Coaches
  module Profiles
    class Create < Core::BaseCommand
      attribute :current_user, User
      attribute :user, User
      attribute :about, String
      attribute :gender, String
      attribute :coach_intensity, String
      attribute :coach_mode, String
      attribute :coach_styles, Hash
      attribute :rate, Integer
      attribute :social_network_links, Hash
      attribute :verified, Virtus::JsonapiBooleanFilterAttributes
      attribute :xalt_sertified, Virtus::JsonapiBooleanFilterAttributes
      attribute :fitnes_domain_ids, Virtus::JsonapiArrayFilterAttributes
      attribute :documents
      attribute :timezone, String
      attribute :training_since, Integer
      attribute :loves, Hash
      attribute :why_with_me_video, String
      attribute :featured, Virtus::JsonapiBooleanFilterAttributes

      validates :current_user, :user, :about, presence: true
      validate :unauthorized_to_change_verified
      validate :unauthorized_to_change_xalt_sertified
      validate :coach_profile_exists?
      include Core::BaseValidator

      attr_reader :coach_profile

      def authorized?
        current_user.admin? || (current_user.coach? && current_user == user)
      end

      def process
        create_coach_profile
      end

      def broadcast_ok
        broadcast(:ok, coach_profile)
      end

      protected

      def create_coach_profile
        @coach_profile = CoachProfile.create!(params)
      end

      def params
        updated_attributes.except!(:current_user)
      end

      def unauthorized_to_change_verified
        return if current_user.admin?

        errors.add(:coach_profile, :unauthorized_to_change) if updated_attributes.include?(:verified)
      end

      def unauthorized_to_change_xalt_sertified
        return if current_user.admin?

        errors.add(:coach_profile, :unauthorized_to_change) if updated_attributes.include?(:xalt_sertified)
      end

      def coach_profile_exists?
        return if current_user.coach_profile.blank?

        errors.add(:coach_profile, :coach_profile_already_exists)
      end
    end
  end
end
