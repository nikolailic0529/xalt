# frozen_string_literal: true

module Stripe
  module Coach
    class CreatePayout < Core::BaseCommand
      attribute :current_user, User

      validate :last_payout_success?

      attr_reader :stripe_payout

      def process
        create_stripe_payout
        update_current_user
        create_billing
      end

      def broadcast_ok
        broadcast(:ok)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def create_stripe_payout
        fee_amount = current_user.coach_profile.earnings * (::BillingRecord::PERCENT_FEE / 100)
        amount_in_cents = (current_user.coach_profile.earnings - fee_amount) * 100

        @stripe_payout = Stripe::Payout.create(
          {
            amount:      amount_in_cents.to_i,
            currency:    'usd',
            destination: current_user.stripe['stripe_external_account_id']
          }
        )
      end

      def create_billing
        BillingRecord.create!(
          coach_profile_id: current_user.coach_profile.id,
          amount:           current_user.coach_profile.earnings,
          xalt_fee:         ::BillingRecord::PERCENT_FEE,
          direction:        'outcoming'
        )
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {last_payout_id: stripe_payout[:id]}
        )
      end

      def last_payout_success?
        stripe_data = current_user.stripe.with_indifferent_access

        success_payout = stripe_data[:payouts]&.detect do |payout|
          (payout[:id] == stripe_data[:last_payout_id]) && payout[:status] == 'paid'
        end

        return if success_payout.present?

        errors.add(:current_user, :last_payout_failed)
      end
    end
  end
end
