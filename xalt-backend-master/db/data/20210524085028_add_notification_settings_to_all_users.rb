class AddNotificationSettingsToAllUsers < ActiveRecord::Migration[6.0]
  def up
    User.find_each do |user|
      user.update(email_notifications_settings:
        {
          member_completed_homework: true,
          new_member: true,
          expired_report: true,
          upcoming_meeting: true
        }
      ) if user.role == 'coach'

      user.update(email_notifications_settings:
        {
          new_homework: true,
          new_meeting: true,
          today_homework: true,
          upcoming_meeting: true
        }
      ) if user.role == 'member'
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
