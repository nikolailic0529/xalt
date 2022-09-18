# frozen_string_literal: true

class ExerciseSerializer < ActiveModel::Serializer
  type :exercises
  attributes :id, :name, :description, :categorie, :equipment, :difficulty, :agonist, :relevant, :start_pos,
             :end_pos, :instruction, :is_competition, :movement, :s3_video_file,
             :is_private, :video_url, :created_at, :vimeo_video_info, :vimeo_video_url

  belongs_to :user, serializer: ::UsersSerializer
  belongs_to :vote_record, serializer: ::VoteRecordSerializer
end
