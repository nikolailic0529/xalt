class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.text :summary
      t.text :additional_comments
      t.timestamps

      t.references :member_profile, type: :uuid, index: true, foreign_key: {to_table: :member_profiles}
      t.references :coach_profile, type: :uuid, index: true, foreign_key: {to_table: :coach_profiles}
    end

    create_table :report_questions, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.text :title, null: false
      t.string :question_type, null: false
      t.timestamps
    end

    create_table :report_answers, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.integer :score
      t.string :answer
      t.timestamps

      t.references :report_question, type: :uuid, index: true, foreign_key: {to_table: :report_questions}
      t.references :report, type: :uuid, index: true, foreign_key: {to_table: :reports}
    end
  end
end
