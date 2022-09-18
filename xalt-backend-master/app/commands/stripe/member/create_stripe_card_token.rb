# frozen_string_literal: true

module Stripe
  module Member
    class CreateStripeCardToken < Core::BaseCommand
      attribute :current_user, User
      attribute :card_data, Virtus::JsonapiJsonFilterAttributes

      attr_reader :stripe_card_token

      def authorized?
        current_user.member?
      end

      def process
        create_stripe_card_token
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok)
      end

      protected

      def create_stripe_card_token
        @stripe_card_token = Stripe::Token.create({card: card_data})
      end

      def update_current_user
        stripe_data = {
          stripe_card_token:     stripe_card_token[:id],
          stripe_card_last4:     stripe_card_token[:card][:last4],
          stripe_card_id:        stripe_card_token[:card][:id],
          stripe_card_exp_year:  stripe_card_token[:card][:exp_year],
          stripe_card_exp_month: stripe_card_token[:card][:exp_month],
          stripe_card_brand:     stripe_card_token[:card][:brand]
        }
        Stripe::UpdateUserStripeData.call(current_user: current_user, stripe_data: stripe_data)
      end
    end
  end
end
