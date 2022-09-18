class ChangeJsonToJsonb < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :tokens, :jsonb
    change_column :coach_profiles, :documents, :jsonb
    change_column :exercises, :vimeo_video_info, :jsonb
  end
end
