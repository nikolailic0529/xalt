# frozen_string_literal: true

module Stripe
  module Coach
    class CreateAccountLink < Core::BaseCommand
      attribute :current_user, User

      attr_reader :stripe_account_link_data

      def process
        create_stripe_account_link
        update_current_user
      end

      def broadcast_ok
        broadcast(:ok, stripe_account_link_data)
      end

      def authorized?
        current_user.coach?
      end

      protected

      def create_stripe_account_link
        @stripe_account_link_data = Stripe::AccountLink.create(
          {
            account:     current_user.stripe['stripe_account_id'],
            refresh_url: refresh_url,
            return_url:  return_url,
            type:        'account_onboarding',
            collect:     'eventually_due'
          }
        )
      end

      def update_current_user
        Stripe::UpdateUserStripeData.call(
          current_user: current_user,
          stripe_data:  {
            stripe_account_link: stripe_account_link_data[:url],
            link_exp:            stripe_account_link_data[:expires_at]
          }
        )
      end

      def return_url
        "#{ENV.fetch('FRONT_END_URL', '')}/coach-onboarding-9"
      end

      def refresh_url
        "#{ENV.fetch('FRONT_END_URL', '')}/coach-onboarding-8"
      end
    end
  end
end
