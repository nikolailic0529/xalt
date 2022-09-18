class CreateStripeProducts < ActiveRecord::Migration[6.0]
  def up
    return unless Rails.env.production?

    Subscription.all.each do |subscription|
      stripe_price = Stripe::Price.create({
        unit_amount: subscription.amount.to_i * 100,
        currency: 'usd',
        recurring: { interval: Subscription::STRIPE_INTERVAL[subscription.type.to_sym]},
        product_data: {
          name: subscription.description,
          metadata: { sessions_count: subscription.sessions_count },
        }
      })
      subscription.update(stripe_price_id: stripe_price[:id])
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
