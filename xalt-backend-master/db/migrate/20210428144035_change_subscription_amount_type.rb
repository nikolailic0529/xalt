class ChangeSubscriptionAmountType < ActiveRecord::Migration[6.0]
  def change
    change_column :subscriptions, :amount, :decimal
  end
end
