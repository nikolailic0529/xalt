class CreateMemberQuestionAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :member_question_answers do |t|
      t.string :identifier
      t.json :answer

      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
