# frozen_string_literal: true

module Stripe
  module Member
    class ChangeStripeSource < Core::BaseCommand
      attribute :current_user, User
      attribute :card_data, Virtus::JsonapiJsonFilterAttributes
      attribute :coupon, String

      attr_reader :stripe_card_token

      validate :stripe_customer_exist?

      def authorized?
        current_user.member?
      end

      def process
        if current_user.stripe['stripe_id'].present?
          delete_stripe_old_source
          clear_current_user_stripe_card
        end

        create_stripe_card_token
        set_stripe_new_source
        add_current_user_stripe_card
        create_invoice if current_user.stripe['stripe_subscription_status'] == 'incomplete'
        current_user.reload

        apply_coupon if coupon
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      protected

      def create_invoice
        invoice = current_user.stripe['invoices'].select { |i| i['status'] == 'open' }.first
        Stripe::Invoice.pay(invoice['id']) if invoice
      end

      def apply_coupon
        subscription = Stripe::Subscription.retrieve(current_user.stripe['stripe_subscription_id'])
        subscription.coupon = coupon
        subscription.save
      end

      def delete_stripe_old_source
        Stripe::Customer.delete_source(
          current_user.stripe['stripe_id'],
          current_user.stripe['stripe_card_id']
        )
      end

      def create_stripe_card_token
        @stripe_card_token = Stripe::Token.create({card: card_data})
      end

      def set_stripe_new_source
        Stripe::Customer.create_source(
          current_user.stripe['stripe_id'],
          {source: stripe_card_token}
        )
      end

      def add_current_user_stripe_card
        stripe_card_token_data = {
          stripe_card_token:     stripe_card_token[:id],
          stripe_card_last4:     stripe_card_token[:card][:last4],
          stripe_card_id:        stripe_card_token[:card][:id],
          stripe_card_exp_year:  stripe_card_token[:card][:exp_year],
          stripe_card_exp_month: stripe_card_token[:card][:exp_month],
          stripe_card_brand:     stripe_card_token[:card][:brand]
        }
        Stripe::UpdateUserStripeData.call(current_user: current_user, stripe_data: stripe_card_token_data)
      end

      def clear_current_user_stripe_card
        stripe_card_token_data = {
          stripe_card_token:     nil,
          stripe_card_last4:     nil,
          stripe_card_id:        nil,
          stripe_card_exp_year:  nil,
          stripe_card_exp_month: nil,
          stripe_card_brand:     nil
        }
        Stripe::UpdateUserStripeData.call(current_user: current_user, stripe_data: stripe_card_token_data)
      end

      def stripe_customer_exist?
        return if current_user.stripe['stripe_id'].present?

        errors.add(:current_user, :stripe_customer_exist)
      end
    end
  end
end
