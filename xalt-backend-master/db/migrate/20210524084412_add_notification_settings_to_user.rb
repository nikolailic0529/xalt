class AddNotificationSettingsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :email_notifications_settings, :jsonb, null: false, default: {}
  end
end
