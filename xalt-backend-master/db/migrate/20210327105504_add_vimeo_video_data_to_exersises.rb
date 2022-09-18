class AddVimeoVideoDataToExersises < ActiveRecord::Migration[6.0]
  def change
    add_column :exercises, :vimeo_video_info, :json, null: false, default: {}
  end
end
