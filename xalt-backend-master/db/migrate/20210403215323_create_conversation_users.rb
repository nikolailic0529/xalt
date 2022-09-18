class CreateConversationUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :conversation_users, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :conversation, type: :uuid, index: true, foreign_key: {to_table: :conversations}
      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
