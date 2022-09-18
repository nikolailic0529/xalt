class AddRehabilitationToCoachProfile < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_profiles, :rehabilitation, :boolean, default: false
  end
end
