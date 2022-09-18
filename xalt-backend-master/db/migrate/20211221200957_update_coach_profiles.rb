class UpdateCoachProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_profiles, :gender, :string
    add_column :coach_profiles, :coach_intensity, :jsonb
    add_column :coach_profiles, :coach_mode, :jsonb
    add_column :coach_profiles, :coach_styles, :jsonb
    add_column :coach_profiles, :rate, :integer
  end
end
