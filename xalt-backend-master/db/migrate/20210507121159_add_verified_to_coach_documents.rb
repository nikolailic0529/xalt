class AddVerifiedToCoachDocuments < ActiveRecord::Migration[6.0]
  def change
    add_column :coach_documents, :is_verified, :boolean, default: false, null: false
  end
end
