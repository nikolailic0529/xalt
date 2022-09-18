class AddIsFinishedInToMeetings < ActiveRecord::Migration[6.0]
  def change
    add_column :meetings, :is_finished, :boolean, null: false, default: false
  end
end
