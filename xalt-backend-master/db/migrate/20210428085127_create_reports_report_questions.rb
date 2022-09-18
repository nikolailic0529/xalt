class CreateReportsReportQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :report_report_questions, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :report, type: :uuid, index: true, foreign_key: {to_table: :reports}
      t.references :report_question, type: :uuid, index: true, foreign_key: {to_table: :report_questions}

      t.timestamps
    end
  end
end
