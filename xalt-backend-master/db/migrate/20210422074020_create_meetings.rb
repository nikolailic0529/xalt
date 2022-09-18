class CreateMeetings < ActiveRecord::Migration[6.0]
  def change
    create_table :meetings, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.datetime :time_from, null: false
      t.datetime :time_to, null: false
      t.boolean :is_member_confirmed, null: false, default: false

      t.references :member_profile, type: :uuid, index: true, foreign_key: {to_table: :member_profiles}
      t.references :coach_profile, type: :uuid, index: true, foreign_key: {to_table: :coach_profiles}
      t.references :program, type: :uuid, index: true, foreign_key: {to_table: :programs}

      t.timestamps
    end
  end
end
