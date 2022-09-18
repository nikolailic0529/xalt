class AddStatusInToPrograms < ActiveRecord::Migration[6.0]
  def change
    add_column :programs, :completed, :boolean, default: false, null: false
  end
end
