class AddS3VideoToExercises < ActiveRecord::Migration[6.0]
  def change
    add_column :exercises, :s3_video_file, :string
  end
end
