class UpdateExerciseTableFieldName < ActiveRecord::Migration[6.0]
  def change
    rename_column :exercises, :agnoist, :agonist
  end
end
