class ChangeFiledsTypes < ActiveRecord::Migration[6.0]
  def change
    change_column :exercises, :name, :string
    change_column :exercises, :movement, :string
    change_column :exercises, :pose, :string
    change_column :exercises, :set_up, :string
    change_column :exercises, :repetitions, :string
    change_column :exercises, :weight_selection, :string

    change_column :program_exercises, :repetitions, :string

    change_column :report_questions, :title, :string
  end
end
