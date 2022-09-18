class AddStripePriceIdToSubscriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :subscriptions, :stripe_price_id, :string
  end
end
