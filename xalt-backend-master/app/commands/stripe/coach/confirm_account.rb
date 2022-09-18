# frozen_string_literal: true

module Stripe
  module Coach
    class ConfirmAccount < Core::BaseCommand
      attribute :current_user, User
      attribute :account_data, Hash

      def process
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {
            charges_enabled:   account_data['charges_enabled'],
            details_submitted: account_data['details_submitted'],
            payouts_enabled:   account_data['payouts_enabled']
          }
        )
      end
    end
  end
end
