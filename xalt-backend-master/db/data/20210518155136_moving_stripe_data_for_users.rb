class MovingStripeDataForUsers < ActiveRecord::Migration[6.0]
  def up
    User.find_each do |user|
      next if user.stripe_id.blank?

      stripe_data = { stripe_id: user.stripe_id, stripe_card_last4: user.stripe_card_last4 }
      user.update_column(:stripe, stripe_data)
    end
  end

  def down
    User.find_each do |user|
      next if user.stripe.blank?

      stripe_data = user.stripe.with_indifferent_access
      user.update_column(:stripe_id, stripe_data[:stripe_id])
      user.update_column(:stripe_card_last4, stripe_data[:stripe_card_last4])
    end
  end
end
