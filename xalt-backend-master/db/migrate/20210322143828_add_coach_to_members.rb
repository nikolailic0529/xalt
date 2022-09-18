class AddCoachToMembers < ActiveRecord::Migration[6.0]
  def change
    add_reference :member_profiles, :coach_profile, type: :uuid, index: true, foreign_key: {to_table: :coach_profiles}
  end
end
