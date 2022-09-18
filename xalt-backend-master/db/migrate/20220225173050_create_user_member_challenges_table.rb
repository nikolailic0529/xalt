class CreateUserMemberChallengesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :user_member_challenges, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :status
      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
      t.references :member_challenge, type: :uuid, index: true, foreign_key: {to_table: :member_challenges}

      t.timestamps
    end
  end
end
