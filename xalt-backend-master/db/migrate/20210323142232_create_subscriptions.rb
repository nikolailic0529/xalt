class CreateSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :subscriptions, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string  :description
      t.integer :sessions_count, null: false, default: 1
      t.string  :type, null: false, default: 'monthly'
      t.float   :amount

      t.timestamps
    end

    add_reference :member_profiles, :subscription, type: :uuid, index: true, foreign_key: {to_table: :subscriptions}
  end
end
