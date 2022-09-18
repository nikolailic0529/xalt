class CreateBackgroundJob < ActiveRecord::Migration[6.0]
  def change
    create_table :background_jobs, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false
      t.jsonb :arguments, null: false
      t.string :status, null: false
      t.string :active_job_id
      t.string :queue_name
      t.string :error_message
      t.integer :failures_count, default: 0

      t.timestamps
    end
  end
end
