# frozen_string_literal: true

class CreatePayoutsJob < Core::BaseJob
  queue_as :payouts

  def perform
    User.joins(:coach_profile).where(role: :coach).where('coach_profiles.earnings > 1.0').find_each do |user|
      create_payout(user)
    end
  end

  def create_payout(user)
    Stripe::Coach::CreatePayout.call(current_user: user)
  end
end
