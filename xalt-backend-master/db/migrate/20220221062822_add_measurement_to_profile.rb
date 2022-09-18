class AddMeasurementToProfile < ActiveRecord::Migration[6.0]
  def change
    add_column :member_profiles, :measurements, :jsonb
  end
end
