class CreateUserMemberChallengeCheckIns < ActiveRecord::Migration[6.0]
    def change
      create_table :user_member_challenge_check_ins, id: :uuid, default: 'gen_random_uuid()' do |t|
        t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
        t.references :member_challenge, type: :uuid, index: true, foreign_key: {to_table: :member_challenges}
        t.datetime :checkin_date
        t.string :checkin_status
        t.string :proof
        t.string :comments
  
        t.timestamps
  
        t.index [:user_id, :member_challenge_id, :checkin_date], unique: true, name: 'user_member_challenge_checkin_index'
      end
    end
  end
  