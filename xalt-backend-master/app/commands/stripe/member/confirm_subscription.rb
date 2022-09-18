# frozen_string_literal: true

module Stripe
  module Member
    class ConfirmSubscription < Core::BaseCommand
      attribute :current_user, User
      attribute :stripe_subscription, Hash

      def authorized?
        current_user.member?
      end

      def process
        update_current_user
        create_billing
      end

      def broadcast_ok
        broadcast(:ok)
      end

      protected

      def create_billing
        BillingRecord.create!(
          {
            subscription:   current_user.member_profile.subscription,
            member_profile: current_user.member_profile,
            amount:         current_user.member_profile.subscription.amount,
            direction:      'incoming'
          }
        )
      end

      def update_current_user
        subscription_data = {
          current_period_start:       stripe_subscription[:current_period_start],
          current_period_end:         stripe_subscription[:current_period_end],
          stripe_subscription_status: stripe_subscription[:status]
        }
        Stripe::UpdateUserStripeData.call(current_user: current_user, stripe_data: subscription_data)
      end
    end
  end
end
