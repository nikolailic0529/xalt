class CreateApiV1MemberMemberCrves < ActiveRecord::Migration[6.0]
  def change
    create_table :member_crves do |t|
      t.string :sex
      t.integer :age
      t.decimal :wc
      t.integer :rhr
      t.decimal :pa
      t.decimal :crf

      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
