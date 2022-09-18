class AddDiractionInToBillingRecors < ActiveRecord::Migration[6.0]
  def change
    add_column :billing_records, :diraction, :string
  end
end
