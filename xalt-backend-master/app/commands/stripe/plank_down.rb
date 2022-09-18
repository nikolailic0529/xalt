# frozen_string_literal: true

module Stripe
  class PlankDown < Core::BaseCommand
    attribute :current_user, User

    def authorized?
      current_user.member?
    end

    def process
      charge
      create_billing_record
    end

    def broadcast_ok
      broadcast(:ok)
    end

    protected

    def charge
      Stripe::Charge.create({
                              customer:    current_user.stripe['stripe_id'],
                              amount:      current_user.member_profile.subscription.amount.to_i * 100,
                              description: current_user.name,
                              currency:    'usd'
                            })
    end

    def create_billing_record
      BillingRecord.create!({
                              subscription:   current_user.member_profile.subscription,
                              member_profile: current_user.member_profile,
                              amount:         current_user.member_profile.subscription.amount,
                              direction:      'incoming'
                            })
    end
  end
end
