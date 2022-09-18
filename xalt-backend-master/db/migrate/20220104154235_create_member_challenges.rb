class CreateMemberChallenges < ActiveRecord::Migration[6.0]
  def change
    create_table :member_challenges, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name
      t.text :description
      t.string :category
      t.text :incentives
      t.string :video_url
      t.string :schedule
      t.string :corporate_tag
      t.datetime :start
      t.datetime :end
      t.boolean :is_competition
      t.boolean :is_private
      t.timestamps
      
      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
    end
  end
end
