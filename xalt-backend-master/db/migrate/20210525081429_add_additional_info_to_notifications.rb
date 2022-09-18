class AddAdditionalInfoToNotifications < ActiveRecord::Migration[6.0]
  def change
    add_column :notifications, :additional_info, :jsonb, default: {}
  end
end
