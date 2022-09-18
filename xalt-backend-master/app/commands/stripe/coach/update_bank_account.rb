# frozen_string_literal: true

module Stripe
  module Coach
    class UpdateBankAccount < Core::BaseCommand
      attribute :current_user, User
      attribute :bank_data, Virtus::JsonapiJsonFilterAttributes

      attr_reader :stripe_bank_account

      def process
        create_stripe_external_account
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def create_stripe_external_account
        @stripe_bank_account = Stripe::Account.update_external_account(
          current_user.stripe['stripe_account_id'],
          current_user.stripe['stripe_bank_account_id'],
          {
            account_holder_name: bank_data[:account_holder_name]
          }
        )
      end

      def update_current_user
        external_account = {
          country:             stripe_bank_account[:country],
          currency:            stripe_bank_account[:currency],
          account_holder_name: stripe_bank_account[:account_holder_name],
          account_holder_type: stripe_bank_account[:account_holder_type],
          routing_number:      stripe_bank_account[:routing_number]
        }
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {external_account: external_account, stripe_bank_account_id: stripe_bank_account[:id]}
        )
      end
    end
  end
end
