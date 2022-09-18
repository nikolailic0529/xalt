class UpdateCoachProfileAddFeatured < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_profiles, :featured, :boolean, default: false
  end
end
