# frozen_string_literal: true

class VoteRecordSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :exercise_id, :is_yes
end
