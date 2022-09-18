# frozen_string_literal: true

module Coaches
  module Profiles
    class Update < Core::BaseCommand
      attribute :current_user, User
      attribute :profile, CoachProfile
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

      validates :current_user, :user, presence: true
      validates :fitnes_domain_ids, length: {maximum: 3, minimum: 1}, if: lambda {
        updated_attributes.has_key?(:fitnes_domain_ids) && (fitnes_domain_ids.length.positive? ||
          fitnes_domain_ids.length.zero?)
      }
      validate :unauthorized_to_change_verified
      validate :unauthorized_to_change_xalt_sertified
      include Core::BaseValidator

      attr_reader :profile

      def authorized?
        current_user.coach? || current_user.admin?
      end

      def process
        update_coach_profile
        profile.reload
      end

      def broadcast_ok
        broadcast(:ok, profile)
      end

      protected

      def update_coach_profile
        profile.update!(params)
      end

      def params
        updated_attributes.except!(:current_user, :profile, :coach_profile)
      end

      def unauthorized_to_change_verified
        return if current_user.admin? || params[:user].id == current_user.id

        errors.add(:coach_profile, :unauthorized_to_change) if updated_attributes.include?(:verified)
      end

      def unauthorized_to_change_xalt_sertified
        return if current_user.admin?

        updated_attributes.except!(:xalt_sertified)
      end
    end
  end
end
