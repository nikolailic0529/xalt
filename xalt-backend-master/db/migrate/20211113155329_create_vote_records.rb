class CreateVoteRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :vote_records do |t|
      t.string :user_id
      t.string :exercise_id
      t.boolean :is_yes

      t.timestamps
    end
  end
end
