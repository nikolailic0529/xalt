# frozen_string_literal: true

module Stripe
  module Member
    class CancelSubscription < Core::BaseCommand
      attribute :current_user, User

      validate :stripe_subscription_exist?

      attr_reader :stripe_subscription

      def authorized?
        current_user.member?
      end

      def process
        delete_stripe_subscription
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      protected

      def delete_stripe_subscription
        @stripe_subscription = Stripe::Subscription.delete(current_user.stripe['stripe_subscription_id'])
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(current_user: current_user,
                                          stripe_data:  {
                                            stripe_subscription_id:     nil,
                                            stripe_subscription_status: stripe_subscription[:status]
                                          })
      end

      def stripe_subscription_exist?
        return if current_user.stripe['stripe_subscription_id'].present?

        errors.add(:current_user, :stripe_subscription_exist)
      end
    end
  end
end
