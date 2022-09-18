class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.text :content, null: false

      t.references :conversation, type: :uuid, index: true, foreign_key: {to_table: :conversations}
      t.references :sender, type: :uuid, index: true, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
