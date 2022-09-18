# frozen_string_literal: true

class Coaches::DocumentsSerializer < ActiveModel::Serializer
  type :coach_documents

  attributes :id, :name, :file, :is_verified

  belongs_to :coach_profile, serializer: Coaches::ProfilesSerializer
end
