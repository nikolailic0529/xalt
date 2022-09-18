class AddStripeTokenIdInToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :stripe_card_last4, :string
  end
end
