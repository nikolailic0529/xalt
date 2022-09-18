# frozen_string_literal: true

class ReadMarksSerializer < ActiveModel::Serializer
  type :read_marks
  attributes :id, :readable_type, :readable_id, :reader_type, :reader_id, :timestamp
end
