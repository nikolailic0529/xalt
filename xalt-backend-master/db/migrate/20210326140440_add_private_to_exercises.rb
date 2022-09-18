class AddPrivateToExercises < ActiveRecord::Migration[6.0]
  def change
    add_column :exercises, :is_private, :boolean, default: true
  end
end
