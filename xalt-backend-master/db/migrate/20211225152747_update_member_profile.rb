class UpdateMemberProfile < ActiveRecord::Migration[6.0]
  def change
    add_column :member_profiles, :move_per_week_current, :integer
    add_column :member_profiles, :move_per_week_plan, :integer
    add_column :member_profiles, :exercise_places, :jsonb
    add_column :member_profiles, :coach_gender_preference, :jsonb
    add_column :member_profiles, :ideal_coach, :jsonb
    add_column :member_profiles, :intensity_level, :string
    add_column :member_profiles, :rate_preference, :string
    add_column :member_profiles, :session_per_week, :integer
  end
end
