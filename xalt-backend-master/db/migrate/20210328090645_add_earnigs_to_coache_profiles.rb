class AddEarnigsToCoacheProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_profiles, :earnings, :float, default: 0.0, null: false
  end
end
