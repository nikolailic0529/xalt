# frozen_string_literal: true

module Stripe
  module Member
    class ChangeStatusInvoice < Core::BaseCommand
      attribute :current_user, User
      attribute :invoice_data, Virtus::JsonapiJsonFilterAttributes

      attr_reader :user_data_invoices

      def process
        update_user_data_invoices
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok)
      end

      def authorized?
        current_user.member?
      end

      protected

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {invoices: user_data_invoices}
        )
      end

      def update_user_data_invoices
        invoices = current_user.stripe['invoices'] || []

        invoices.pop if invoices.length == 4

        @user_data_invoices = invoices.unshift(invoice_data)
      end
    end
  end
end
