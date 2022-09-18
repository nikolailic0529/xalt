# frozen_string_literal: true

module Stripe
  module Member
    class CreateCharge < Core::BaseCommand
      attribute :current_user, User
      attribute :amount, Integer
      attribute :lesson_count, Integer
      attribute :subscription_type, String
      attribute :currency, String

      validate :stripe_customer_exist?

      def authorized?
        current_user.member?
      end

      def process
        create_stripe_charge
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      protected

      def create_stripe_charge
        Stripe::Charge.create(
          {
            customer:    current_user.stripe['stripe_id'],
            amount:      amount * 100,
            description: current_user.name,
            currency:    currency || 'usd'
          }
        )
      end

      def charge_price
        current_user.member_profile.charge.stripe_price_id
      end

      def update_current_user
        lesson_count = (current_user.lesson_count || 0) + (updated_attributes[:lesson_count] || 0)
        current_user.update!(lesson_count: lesson_count, subscription_type: subscription_type)
      end

      def stripe_customer_exist?
        return if current_user.stripe['stripe_id'].present?

        errors.add(:current_user, :stripe_customer_exist)
      end
    end
  end
end
