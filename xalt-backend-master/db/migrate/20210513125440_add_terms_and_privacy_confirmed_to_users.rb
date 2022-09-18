class AddTermsAndPrivacyConfirmedToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :terms_and_privacy_confirmed, :boolean, null: false, default: false
  end
end
