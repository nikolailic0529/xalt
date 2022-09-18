# frozen_string_literal: true

module Stripe
  module Coach
    class CreateAccount < Core::BaseCommand
      attribute :current_user, User
      attribute :country, String

      attr_reader :stripe_account

      def process
        create_stripe_express_account
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, stripe_account[:id])
      end

      def authorized?
        current_user.coach?
      end

      protected

      def create_stripe_express_account
        @stripe_account = Stripe::Account.create(
          {
            country:      country || 'CA',
            type:         'custom',
            email:        current_user.email,
            capabilities: {
              card_payments: {requested: true},
              transfers:     {requested: true},
            },
          }
        )
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {
            stripe_account_id: stripe_account[:id],
            charges_enabled:   false,
            details_submitted: false,
            payouts_enabled:   false
          }
        )
      end
    end
  end
end
