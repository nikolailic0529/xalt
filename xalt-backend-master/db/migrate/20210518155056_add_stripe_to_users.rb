class AddStripeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :stripe, :jsonb, default: {}, null: false
  end
end
