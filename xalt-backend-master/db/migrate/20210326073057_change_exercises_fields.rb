class ChangeExercisesFields < ActiveRecord::Migration[6.0]
  def change
    change_column :exercises, :name, :text, null: false
    change_column :exercises, :description, :text, null: false
    change_column :exercises, :category, :string, null: false
    rename_column :exercises, :category, :categorie
    change_column :exercises, :equipment, :string, null: false
    change_column :exercises, :difficulties,:string, null: false
    rename_column :exercises, :difficulties, :difficulty
    change_column :exercises, :pose, :text, null: false
    change_column :exercises, :set_up, :text, null: false
    change_column :exercises, :repetition, :text, null: true
    change_column_default :exercises, :repetition, nil
    rename_column :exercises, :repetition, :repetitions
    add_column :exercises, :pace, :string
    add_column :exercises, :weight_selection, :text
  end
end
