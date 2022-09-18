# frozen_string_literal: true

class Stripe::AccountsController < AuthenticatedController
  rescue_from Stripe::InvalidRequestError, Stripe::APIConnectionError, Stripe::StripeError, with: :handling_stripe_errors

  def current_account
    account = Stripe::Account.retrieve(current_user.stripe['stripe_account_id'])

    render(json: account, status: :ok)
  end

  def create_link
    stripe_account_id = current_user.stripe['stripe_account_id'].presence || run_command!(Stripe::Coach::CreateAccount,
                                                                                          params_with_current_user)

    stripe_account_link_data = run_command!(
      Stripe::Coach::CreateAccountLink,
      {current_user: current_user, stripe_account_id: stripe_account_id}
    )

    render(json: stripe_account_link_data, status: :ok)
  end

  def create_bank_account
    user = run_command!(Stripe::Coach::CreateBankAccount, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  def update_bank_account
    user = run_command!(Stripe::Coach::UpdateBankAccount, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  def destroy_bank_account
    user = run_command!(Stripe::Coach::DestroyBankAccount, params_with_current_user)

    render(json: user, each_serializer: UsersSerializer, status: :ok)
  end

  private

  def handling_stripe_errors(exception)
    render json: exception.error.message, status: :unprocessable_entity
  end
end
