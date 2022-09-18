class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :content, null: false, default: ''
      t.string :type, null: false
      t.boolean :mark_as_read, null: false, default: false

      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
