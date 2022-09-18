class UpdateCoachProfileFieldType < ActiveRecord::Migration[6.0]
  def change
    change_column :coach_profiles, :coach_intensity, :string
    change_column :coach_profiles, :coach_mode, :string
  end
end
