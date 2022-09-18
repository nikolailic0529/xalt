class AddUserSubscriptionType < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :subscription_type, :string
  end
end
