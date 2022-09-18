# frozen_string_literal: true

class ConversationUser < ApplicationRecord
  acts_as_paranoid

  belongs_to :conversation
  belongs_to :user, class_name: :User
end
