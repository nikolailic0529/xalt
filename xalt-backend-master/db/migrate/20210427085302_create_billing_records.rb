class CreateBillingRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :billing_records, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :meeting, foreign_key: true, type: :uuid
      t.references :subscription, foreign_key: true, type: :uuid
      t.references :coach_profile, foreign_key: true, type: :uuid
      t.references :member_profile, foreign_key: true, type: :uuid
      t.decimal :income, null: false, default: 0.0

      t.timestamps
    end
  end
end
