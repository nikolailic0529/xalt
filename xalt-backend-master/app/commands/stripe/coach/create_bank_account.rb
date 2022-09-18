# frozen_string_literal: true

module Stripe
  module Coach
    class CreateBankAccount < Core::BaseCommand
      attribute :current_user, User
      attribute :bank_data, Virtus::JsonapiJsonFilterAttributes

      attr_reader :stripe_bank_account

      def process
        create_stripe_bank_account
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, current_user)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def create_stripe_bank_account
        @stripe_bank_account = Stripe::Account.create_external_account(
          current_user.stripe['stripe_account_id'],
          {
            external_account: {
              object:              'bank_account',
              country:             bank_data[:country],
              currency:            'usd',
              account_holder_name: bank_data[:account_holder_name],
              account_holder_type: 'individual',
              routing_number:      bank_data[:routing_number],
              account_number:      bank_data[:account_number]
            }
          }
        )
      end

      def update_current_user
        external_account = {
          country:             stripe_bank_account[:country],
          currency:            stripe_bank_account[:currency],
          account_holder_name: stripe_bank_account[:account_holder_name],
          account_holder_type: stripe_bank_account[:account_holder_type],
          routing_number:      stripe_bank_account[:routing_number],
          account_number:      bank_data[:account_number],
          institution_number:  bank_data[:institution_number]
        }
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {external_account: external_account, stripe_bank_account_id: stripe_bank_account[:id]}
        )
      end
    end
  end
end
