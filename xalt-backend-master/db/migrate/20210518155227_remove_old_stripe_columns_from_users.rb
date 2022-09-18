class RemoveOldStripeColumnsFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :stripe_id, :string
    remove_column :users, :stripe_card_last4, :string
  end
end
