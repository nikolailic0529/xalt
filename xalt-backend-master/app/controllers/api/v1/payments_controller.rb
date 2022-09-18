# frozen_string_literal: true

class Api::V1::PaymentsController < AuthenticatedController
  rescue_from Stripe::CardError, Stripe::InvalidRequestError, Stripe::APIConnectionError, with: :handling_stripe_errors

  def init
    user = nil
    begin
      user = run_command!(Stripe::Member::Init, params_with_current_user)
    rescue => e
      return render(json: {failure: e.message, stack_trace: e.backtrace}, status: :internal_server_error)
    end

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  def one_time_charge
    user = run_command!(Stripe::Member::CreateCharge, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  def charge
    message = run_command!(Stripe::PlankDown, params_with_current_user)

    render(json: message.to_json || {}, status: :ok)
  end

  def change_card
    user = run_command!(Stripe::Member::ChangeStripeSource, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  def create_subscription
    user = run_command!(Stripe::Member::CreateSubscription, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  def cancel_subscription
    user = run_command!(Stripe::Member::CancelSubscription, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  private

  def handling_stripe_errors(exception)
    render json: exception.message, status: :unprocessable_entity
  end
end
