class AddXaltFeeToBillingRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :billing_records, :xalt_fee, :decimal, default: 0.0
  end
end
