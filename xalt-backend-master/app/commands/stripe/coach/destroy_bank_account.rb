# frozen_string_literal: true

module Stripe
  module Coach
    class DestroyBankAccount < Core::BaseCommand
      attribute :current_user, User

      def process
        delete_stripe_bank_account
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def delete_stripe_bank_account
        Stripe::Account.delete_external_account(
          current_user.stripe['stripe_account_id'],
          current_user.stripe['stripe_bank_account_id']
        )
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {external_account: {}, stripe_bank_account_id: nil}
        )
      end
    end
  end
end
