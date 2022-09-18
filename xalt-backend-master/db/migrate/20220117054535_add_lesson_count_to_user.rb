class AddLessonCountToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :lesson_count, :integer
  end
end
