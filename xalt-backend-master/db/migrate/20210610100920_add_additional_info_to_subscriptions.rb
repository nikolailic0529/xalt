class AddAdditionalInfoToSubscriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :subscriptions, :additional_information, :string
  end
end
