class CreateDefaultSubscriptions < ActiveRecord::Migration[6.0]
  def up
    Subscription.create!(description: '1 session per week', sessions_count: 4,  type: 'monthly', amount: 85.0)
    Subscription.create!(description: '2 session per week', sessions_count: 8,  type: 'monthly', amount: 170.0)
    Subscription.create!(description: '3 session per week', sessions_count: 12, type: 'monthly', amount: 255.0)
    Subscription.create!(description: '4 session per week', sessions_count: 16, type: 'monthly', amount: 340.0)
    Subscription.create!(description: '5 session per week', sessions_count: 20, type: 'monthly', amount: 425.0)

    Subscription.create!(description: '1 session per week', sessions_count: 48,  type: 'annual', amount: 1020.0)
    Subscription.create!(description: '2 session per week', sessions_count: 96,  type: 'annual', amount: 2040.0)
    Subscription.create!(description: '3 session per week', sessions_count: 144, type: 'annual', amount: 3060.0)
    Subscription.create!(description: '4 session per week', sessions_count: 192, type: 'annual', amount: 4080.0)
    Subscription.create!(description: '5 session per week', sessions_count: 240, type: 'annual', amount: 5100.0)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
