class CreateConversations < ActiveRecord::Migration[6.0]
  def change
    create_table :conversations, id: :uuid, default: 'gen_random_uuid()' do |t|

      t.timestamps
    end
  end
end
