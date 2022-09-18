class CreateDefaultReportQuestions < ActiveRecord::Migration[6.0]
  def up
    rating_titles = ['Quality of sleep', 'Stress levels', 'Quality of nutrition/diet', 'Physical fitness levels', 'Level of community engagement and/or involvement', 'Overall happiness']
    rating_titles.each do |item|
      ReportQuestion.create(question_type: 'rating', title: item)
    end

    ReportQuestion.create(question_type: 'no_rating', title: 'Were you able to complete the homework that was assigned to you in the last session?')
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
