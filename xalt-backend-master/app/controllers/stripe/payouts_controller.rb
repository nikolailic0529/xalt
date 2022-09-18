# frozen_string_literal: true

class Stripe::PayoutsController < ApplicationController
  rescue_from Stripe::InvalidRequestError, Stripe::APIConnectionError, Stripe::StripeError, with: :handling_stripe_errors

  def index
    payouts = run_command!(Stripe::Coach::ListPayouts, params_with_current_user)

    render(json: payouts, status: :ok)
  end

  private

  def handling_stripe_errors(exception)
    process_invalid_error(exception.error.message)
  end
end
