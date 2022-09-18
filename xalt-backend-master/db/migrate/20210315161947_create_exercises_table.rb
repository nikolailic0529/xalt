class CreateExercisesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :exercises, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name
      t.text :description
      t.string :category
      t.string :equipment
      t.string :difficulties
      t.text :movement
      t.text :pose
      t.text :set_up
      t.integer :repetition, null: false, default: 0
      t.integer :repetition_duration, null: false, default: 0
      t.integer :sets, null: false, default: 0
      t.string :video_url
      t.timestamps

      t.references :user, type: :uuid, index: true, foreign_key: {to_table: :users}
    end
  end
end
