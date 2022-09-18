# frozen_string_literal: true

class Stripe::EventsController < ApplicationController
  def invoice
    invoice = params[:data][:object]
    user = find_user(invoice[:customer])
    invoice_data = {
      id:                     invoice[:id],
      status:                 invoice[:status],
      amount_paid:            invoice[:amount_paid],
      amount_due:             invoice[:amount_due],
      amount_remaining:       invoice[:amount_remaining],
      application_fee_amount: invoice[:application_fee_amount],
      attempt_count:          invoice[:attempt_count],
      currency:               invoice[:currency],
      status_transitions:     invoice[:status_transitions]
    }

    if params[:type] == 'invoice.payment_succeeded'
      stripe_subscription = find_subscription(user.stripe['stripe_subscription_id']) if user.present?

      if user.present? && stripe_subscription.present?
        run_command!(
          Stripe::Member::ConfirmSubscription,
          {current_user: user, stripe_subscription: stripe_subscription}
        )
      end
    end

    if user.present?
      run_command!(
        Stripe::Member::ChangeStatusInvoice,
        {current_user: user, invoice_data: invoice_data}
      )
    end

    render json: {}, status: :ok
  end

  def account
    if params[:type] == 'account.updated'
      user = User.where('stripe @> ?', {stripe_account_id: params[:data][:object][:id]}.to_json).first

      run_command!(Stripe::Coach::ConfirmAccount, {current_user: user, account_data: params[:data][:object]})
    end

    render json: {}, status: :ok
  end

  def payout
    payout = params[:data][:object]
    user = User.where('stripe @> ?', {stripe_bank_account_id: payout[:destination]}.to_json).first
    payout_data = {
      id:          payout[:id],
      destination: payout[:destination],
      status:      payout[:status],
      amount:      payout[:amount],
      created:     payout[:created],
      source_type: payout[:source_type],
      currency:    payout[:currency]
    }

    run_command!(Stripe::Coach::ChangeStatusPayout, {current_user: user, payout_data: payout_data}) if user.present?

    render json: {}, status: :ok
  end

  protected

  def find_user(stripe_id)
    User.where('stripe @> ?', {stripe_id: stripe_id}.to_json).first
  end

  def find_subscription(stripe_subscription_id)
    Stripe::Subscription.retrieve(stripe_subscription_id)
  end
end
