class ChangeTypeForPgSearchDocumentsSearchableId < ActiveRecord::Migration[6.0]
  def up
    say_with_time("Dropping table for pg_search multisearch") do
      drop_table :pg_search_documents
    end

    say_with_time("Creating table for pg_search multisearch") do
      create_table :pg_search_documents do |t|
        t.text :content
        t.belongs_to :searchable, polymorphic: true, index: true, type: :uuid
        t.timestamps null: false
      end
    end
  end
end
