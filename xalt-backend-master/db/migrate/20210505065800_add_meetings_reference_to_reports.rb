class AddMeetingsReferenceToReports < ActiveRecord::Migration[6.0]
  def change
    add_reference :reports, :meeting, type: :uuid, index: true, foreign_key: {to_table: :meetings}
    add_column :meetings, :report_id, :string
  end
end
