# frozen_string_literal: true

module Stripe
  class CreateProduct < Core::BaseCommand
    attribute :subscription, Subscription

    attr_reader :stripe_price

    def process
      create_stripe_price
      update_subscription
    end

    def broadcast_ok
      broadcast(:ok)
    end

    def authorized?
      true
    end

    protected

    def create_stripe_price
      @stripe_price = Stripe::Price.create(
        {
          unit_amount:  subscription.amount.to_i * 100,
          currency:     'usd',
          recurring:    {interval: ::Subscription::STRIPE_INTERVAL[subscription.type.to_sym]},
          product_data: {
            name:     subscription.description,
            metadata: {sessions_count: subscription.sessions_count},
          },
        }
      )
    end

    def update_subscription
      subscription.update!(stripe_price_id: stripe_price[:id])
    end
  end
end
