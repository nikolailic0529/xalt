class AddAvatarToUsers < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :image, :avatar
  end
end
