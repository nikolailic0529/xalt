class RenameIncomeInBillingRecords < ActiveRecord::Migration[6.0]
  def change
    rename_column :billing_records, :income, :amount
  end
end
