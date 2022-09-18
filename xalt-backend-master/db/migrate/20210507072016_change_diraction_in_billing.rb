class ChangeDiractionInBilling < ActiveRecord::Migration[6.0]
  def change
    rename_column :billing_records, :diraction, :direction
  end
end
