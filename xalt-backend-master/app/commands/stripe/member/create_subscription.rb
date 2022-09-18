# frozen_string_literal: true

module Stripe
  module Member
    class CreateSubscription < Core::BaseCommand
      attribute :current_user, User
      attribute :coupon, String

      attr_reader :stripe_subscription

      validate :stripe_subscription_empty?
      validate :stripe_customer_exist?

      def authorized?
        current_user.member?
      end

      def process
        return if current_user.stripe['stripe_subscription_id'].present?

        create_stripe_subscription
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      protected

      def create_stripe_subscription
        @stripe_subscription = Stripe::Subscription.create(
          {
            customer: current_user.stripe['stripe_id'],
            items:    [{price: subscription_price}],
            coupon:   coupon || '',
          }
        )
      end

      def subscription_price
        current_user.member_profile.subscription.stripe_price_id
      end

      def update_current_user
        stripe_data = {stripe_subscription_id:     stripe_subscription[:id],
                       stripe_subscription_status: stripe_subscription[:status],
                       current_period_start:       stripe_subscription[:current_period_start],
                       current_period_end:         stripe_subscription[:current_period_end]}
        Stripe::UpdateUserStripeData.call(current_user: current_user, stripe_data: stripe_data)
        current_user.update!(subscription_type: 'subscription')
      end

      def stripe_subscription_empty?
        return if current_user.stripe['current_period_end'].blank? || subscription_is_not_expired?

        errors.add(:current_user, :stripe_subscription_empty)
      end

      def stripe_customer_exist?
        return if current_user.stripe['stripe_id'].present?

        errors.add(:current_user, :stripe_customer_exist)
      end

      def subscription_is_not_expired?
        Time.zone.at(current_user.stripe['current_period_end']).to_datetime < Time.zone.now
      end
    end
  end
end
