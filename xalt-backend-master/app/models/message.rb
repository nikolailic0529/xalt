# frozen_string_literal: true

class Message < ApplicationRecord
  include ActionView::Helpers::SanitizeHelper

  belongs_to :conversation, touch: true
  belongs_to :sender, class_name: :User

  def content=(str)
    super(sanitize(str, tags: []))
  end
end
