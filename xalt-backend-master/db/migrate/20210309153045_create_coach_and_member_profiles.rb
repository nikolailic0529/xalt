class CreateCoachAndMemberProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :coach_profiles, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.text :about, null: false, default: ''
      t.jsonb :social_network_links, null: false, default: {}
      t.boolean :verified, null: false, default: false
      t.boolean :xalt_sertified, null: false, default: false
      t.timestamps

      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
    end

    create_table :member_profiles, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.integer :hours_spend_last_week, null: false, default: 0
      t.timestamps

      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
    end
  end
end
