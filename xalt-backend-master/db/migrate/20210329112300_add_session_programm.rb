class AddSessionProgramm < ActiveRecord::Migration[6.0]
  def change
    rename_column :exercises, :repetition_duration, :repetitions_duration

    create_table :program_exercises, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.integer :sets
      t.text :repetitions
      t.integer :repetitions_duration
      t.string :link_url

      t.references :exercise, type: :uuid, index: true, foreign_key: {to_table: :exercises}
      t.timestamps
    end

    create_table :programs, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :type, null: false

      t.references :coach_profile, type: :uuid, index: true, foreign_key: {to_table: :coach_profiles}
      t.references :member_profile, type: :uuid, index: true, foreign_key: {to_table: :member_profiles}
      t.timestamps
    end

    add_reference :program_exercises, :program, type: :uuid, index: true, foreign_key: {to_table: :programs}

  end
end
