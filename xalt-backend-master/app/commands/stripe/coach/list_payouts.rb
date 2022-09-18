# frozen_string_literal: true

module Stripe
  module Coach
    class ListPayouts < Core::BaseCommand
      attribute :current_user, User
      attribute :last_payout_id, String

      def process
        list_payouts
      end

      def broadcast_ok
        broadcast(:ok)
      end

      def authorized?
        current_user.admin? || current_user.coach?
      end

      protected

      def list_payouts
        Stripe::Payout.list(payout_params)
      end

      def payout_params
        params = {limit: 10}
        params[:destination] = current_user.stripe['stripe_bank_account_id'] if current_user.coach?
        params[:start_after] = last_payout_id if last_payout_id.present?

        Stripe::Payouts.list(params)
      end
    end
  end
end
