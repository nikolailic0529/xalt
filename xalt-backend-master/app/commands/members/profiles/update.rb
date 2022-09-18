# frozen_string_literal: true

module Members
  module Profiles
    class Update < Core::BaseCommand
      attribute :current_user, User
      attribute :profile, MemberProfile
      attribute :user, User
      attribute :hours_spend_last_week, Integer
      attribute :fitnes_domain_ids, Virtus::JsonapiArrayFilterAttributes
      attribute :subscription_id, String
      attribute :coach_profile_id, String

      attribute :move_per_week_current, Integer
      attribute :move_per_week_plan, Integer
      attribute :exercise_places, Hash
      attribute :coach_gender_preference, Hash
      attribute :ideal_coach, Hash
      attribute :intensity_level, String
      attribute :rate_preference, String
      attribute :session_per_week, Integer
      attribute :measurements, Hash

      validates :current_user, :user, :profile, presence: true
      validates :fitnes_domain_ids, length: {maximum: 3, minimum: 1}, if: lambda {
        updated_attributes.has_key?(:fitnes_domain_ids) && (fitnes_domain_ids.length.positive? ||
          fitnes_domain_ids.length.zero?)
      }
      include Core::BaseValidator

      def authorized?
        current_user.coach? || current_user.member? && current_user == user
      end

      def process
        MemberProfile.transaction do
          update_member_profile
          delete_old_chat_conversations if attribute_changed?(:coach_profile_id) && params[:coach_profile_id].present?
          create_notification if attribute_changed?(:coach_profile_id) && params[:coach_profile_id].present?
          profile.reload
          create_chat_conversation_room unless chat_conversation_exist?
        end
      end

      def broadcast_ok
        broadcast(:ok, profile)
      end

      protected

      def chat_conversation_exist?
        Conversation.joins(:member_profiles, :coach_profiles)
                    .where(member_profiles: {id: profile.id}, coach_profiles: {id: coach_profile_id})
                    .any?
      end

      def create_chat_conversation_room
        return if profile.coach_profile.blank?

        Conversation.create!(users: [profile.user, profile.coach_profile.user])
      end

      def delete_old_chat_conversations
        Conversation.joins(:member_profiles, :coach_profiles)
                    .where(member_profiles: {id: profile.id}).where.not(coach_profiles: {id: coach_profile_id})
                    .destroy_all
      end

      def update_member_profile
        profile.update!(params)
      end

      def params
        updated_attributes.except(:current_user, :profile)
      end

      def create_notification
        NotificationService.call(user_id:             profile.coach_profile.user_id,
                                 type:                :new_member,
                                 notification_sender: profile.user.name,
                                 member_profile_id:   profile.id)
      end
    end
  end
end
