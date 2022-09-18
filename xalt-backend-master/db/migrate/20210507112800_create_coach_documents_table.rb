class CreateCoachDocumentsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :coach_documents, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false, default: ''
      t.string :file, null: false

      t.references :coach_profile, type: :uuid, index: true, foreign_key: {to_table: :coach_profiles}

      t.timestamps
    end

    remove_column :coach_profiles, :documents
  end
end
