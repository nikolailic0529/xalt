# frozen_string_literal: true

class CoachDocument < ApplicationRecord
  belongs_to :coach_profile

  mount_uploader :file, DocumentsUploader
end
