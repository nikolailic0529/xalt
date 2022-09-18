# frozen_string_literal: true

module Stripe
  module Member
    class CreateCustomer < Core::BaseCommand
      attribute :current_user, User

      attr_reader :stripe_customer

      def process
        return if current_user.stripe['stripe_id'].present?

        create_stripe_customer
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok)
      end

      def authorized?
        current_user.member?
      end

      protected

      def create_stripe_customer
        @stripe_customer = Stripe::Customer.create(
          {
            email:       current_user.email,
            name:        current_user.name,
            source:      current_user.stripe['stripe_card_token'],
            description: 'Customer'
          }
        )
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(current_user: current_user, stripe_data: {stripe_id: stripe_customer[:id]})
      end
    end
  end
end
