class AddIsFilledToReports < ActiveRecord::Migration[6.0]
  def change
    add_column :reports, :is_filled, :boolean, default: false
  end
end
