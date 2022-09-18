class UpdateExerciseTable < ActiveRecord::Migration[6.0]
  def change
    remove_column :exercises, :pose, :text
    remove_column :exercises, :set_up, :text
    remove_column :exercises, :sets, :integer
    remove_column :exercises, :repetitions, :integer
    remove_column :exercises, :repetitions_duration, :integer
    remove_column :exercises, :pace, :string
    remove_column :exercises, :weight_selection, :text
    add_column :exercises, :agnoist, :text
    add_column :exercises, :relevant, :text
    add_column :exercises, :start_pos, :string
    add_column :exercises, :end_pos, :string
    add_column :exercises, :instruction, :text
    add_column :exercises, :is_competition, :boolean
  end
end
