class CreateDefaultFitnesDomains < ActiveRecord::Migration[6.0]
  def up
    FitnesDomain.create!(
      [
        {name: 'strength', coach_domain_name: 'Athletic Performance and Functional Training', member_goal_name: 'Improve strength and cardiovascular fitness'},
        {name: 'health', coach_domain_name: 'Strength and Conditioning', member_goal_name: 'Improve overall health and fitness'},
        {name: 'weight loss', coach_domain_name: 'Fat Loss and Body Transformation', member_goal_name: 'Weight loss and body transformation'},
        {name: 'improve lifestyle', coach_domain_name: 'Fitness and Lifestyle Coaching', member_goal_name: 'Improve lifestyle (reduce stress, stay motivated)'},
        {name: 'mobility', coach_domain_name: 'Mobility & Corrective Exercise', member_goal_name: 'Improve mobility '},
        {name: 'muscle', coach_domain_name: 'Muscle Building', member_goal_name: 'Build muscle'}
      ]
    )
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
