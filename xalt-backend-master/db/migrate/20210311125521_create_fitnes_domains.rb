class CreateFitnesDomains < ActiveRecord::Migration[6.0]
  def change
    create_table :fitnes_domains, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false, default: ''
      t.string :coach_domain_name, null: false, default: ''
      t.string :member_goal_name, null: false, default: ''

      t.timestamps
    end

    create_table :coach_fitnes_domains, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :fitnes_domain, type: :uuid, index: true, foreign_key: {to_table: :fitnes_domains}
      t.references :coach_profile, type: :uuid, index: true, foreign_key: {to_table: :coach_profiles}
    end

    create_table :member_fitnes_domains, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :fitnes_domain, type: :uuid, index: true, foreign_key: {to_table: :fitnes_domains}
      t.references :member_profile, type: :uuid, index: true, foreign_key: {to_table: :member_profiles}
    end
  end
end
