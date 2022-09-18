# frozen_string_literal: true

module Stripe
  module Coach
    class ChangeStatusPayout < Core::BaseCommand
      attribute :current_user, User
      attribute :payout_data, Virtus::JsonapiJsonFilterAttributes

      attr_reader :user_data_payouts, :billing_record

      def process
        update_user_data_payouts
        if payout_data[:status] == 'paid'
          find_billing_record
          update_coach_earnings
        end
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def find_billing_record
        @billing_record = BillingRecord.where(
          subscription: nil, coach_profile_id: current_user.coach_profile.id, direction: 'outcoming'
        ).order(:created_at).last
      end

      def update_coach_earnings
        earnings = current_user.coach_profile.earnings
        earnings -= billing_record.amount
        current_user.coach_profile.update(earnings: earnings)
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {payouts: user_data_payouts}
        )
      end

      def update_user_data_payouts
        payouts = current_user.stripe['payouts'] || []

        payouts.pop if payouts.length == 4

        @user_data_payouts = payouts.unshift(payout_data)
      end
    end
  end
end
