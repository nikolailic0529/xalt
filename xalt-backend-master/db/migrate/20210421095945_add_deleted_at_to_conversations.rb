class AddDeletedAtToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :deleted_at, :datetime
    add_index :conversations, :deleted_at

    add_column :conversation_users, :deleted_at, :datetime
    add_index :conversation_users, :deleted_at
  end
end
