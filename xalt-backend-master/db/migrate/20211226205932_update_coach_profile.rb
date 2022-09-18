class UpdateCoachProfile < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_profiles, :timezone, :string
    add_column :coach_profiles, :training_since, :integer
    add_column :coach_profiles, :loves, :jsonb
    add_column :coach_profiles, :why_with_me_video, :string
  end
end
