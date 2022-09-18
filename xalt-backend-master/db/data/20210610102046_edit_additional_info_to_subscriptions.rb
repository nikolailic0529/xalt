class EditAdditionalInfoToSubscriptions < ActiveRecord::Migration[6.0]
  def up
    Subscription.where(sessions_count: [4, 48]).each do |subscription|
      subscription.update(additional_information: "For members who are just looking for an occasional reminder to keep working toward achieving their goals.")
    end

    Subscription.where(sessions_count: [8, 96]).each do |subscription|
      subscription.update(additional_information: "For members who want to take their health and fitness to the next level and work toward lasting behaviour change.")
    end

    Subscription.where(sessions_count: [12, 144]).each do |subscription|
      subscription.update(additional_information: "For members who want to have frequent touch points with their coach to support all of their health and fitness goals.")
    end

    Subscription.where(sessions_count: [16, 192]).each do |subscription|
      subscription.update(additional_information: "For members who are persistant in achieving goals and getting results that really do last.")
    end

    Subscription.where(sessions_count: [20, 240]).each do |subscription|
      subscription.update(additional_information: "For members with ambitious health and fitness goals, or those who require their coach’s support for full accountability.")
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
