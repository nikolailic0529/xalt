class AddDocumentsToCoachProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_profiles, :documents, :json
  end
end
