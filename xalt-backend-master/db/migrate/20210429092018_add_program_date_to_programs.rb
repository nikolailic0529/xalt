class AddProgramDateToPrograms < ActiveRecord::Migration[6.0]
  def change
    add_column :programs, :program_date, :datetime
  end
end
