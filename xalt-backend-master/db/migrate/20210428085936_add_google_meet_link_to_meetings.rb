class AddGoogleMeetLinkToMeetings < ActiveRecord::Migration[6.0]
  def change
    add_column :meetings, :google_meet_url, :string
  end
end
