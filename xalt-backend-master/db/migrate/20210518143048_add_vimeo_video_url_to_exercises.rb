class AddVimeoVideoUrlToExercises < ActiveRecord::Migration[6.0]
  def change
    add_column :exercises, :vimeo_video_url, :string, null: false, default: ''
  end
end
