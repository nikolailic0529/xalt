# frozen_string_literal: true

module Stripe
  module Member
    class Init < Core::BaseCommand
      attribute :current_user, User
      attribute :card_data, Virtus::JsonapiJsonFilterAttributes
      attribute :coupon, String
      attribute :amount, Integer
      attribute :lesson_count, Integer
      attribute :subscription_type, String
      attribute :currency, String

      # validate :stripe_customer_empty?
      # validate :stripe_subscription_empty?

      def authorized?
        current_user.member?
      end

      def process
        if current_user.stripe['stripe_subscription_id'].present?
          delete_stripe_subscription
          update_current_user
        end
        if current_user.stripe['stripe_id'].blank?
          create_stripe_card_token
          create_stripe_customer
        end
        if (updated_attributes['subscription_type'] || updated_attributes[:subscription_type]) == 'subscription'
          create_stripe_subscription
        else
          create_stripe_charge
        end
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

      def create_stripe_card_token
        Stripe::Member::CreateStripeCardToken.call(card_data: card_data, current_user: current_user)
      end

      def create_stripe_customer
        Stripe::Member::CreateCustomer.call(updated_attributes)
      end

      def create_stripe_subscription
        Stripe::Member::CreateSubscription.call(updated_attributes)
      end

      def create_stripe_charge
        Stripe::Member::CreateCharge.call(updated_attributes)
      end

      # def stripe_customer_empty?
      #   return if current_user.stripe['stripe_id'].blank?

      #   errors.add(:current_user, :stripe_customer_empty)
      # end

      # def stripe_subscription_empty?
      #   return if current_user.stripe['stripe_subscription_id'].blank?

      #   errors.add(:current_user, :stripe_subscription_empty)
      # end
    end
  end
end
