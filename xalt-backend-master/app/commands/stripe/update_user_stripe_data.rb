# frozen_string_literal: true

module Stripe
  class UpdateUserStripeData < Core::BaseCommand
    attribute :current_user, User
    attribute :stripe_data, Hash

    def process
      update_current_user
      current_user.reload
    end

    def broadcast_ok
      broadcast(:ok)
    end

    def authorized?
      current_user.member? || current_user.coach?
    end

    protected

    def update_current_user
      old_stripe_data = current_user.stripe.with_indifferent_access
      updated_stripe_data = old_stripe_data.merge(stripe_data)

      current_user.update!(stripe: updated_stripe_data)
    end
  end
end
