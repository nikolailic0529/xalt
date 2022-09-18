class CreatePgSearchDocuments < ActiveRecord::Migration[6.0]
  def up
    PgSearch::Multisearch.rebuild(User)
    PgSearch::Multisearch.rebuild(Exercise)
    PgSearch::Multisearch.rebuild(Program)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
