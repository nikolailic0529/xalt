# frozen_string_literal: true

class Conversation < ApplicationRecord
  acts_as_paranoid
  acts_as_readable on: :updated_at

  has_many :messages, -> { order('id DESC').limit(10) }, dependent: :destroy
  has_many :conversation_users, dependent: :destroy
  has_many :users, through: :conversation_users
  has_many :coach_profiles, through: :users
  has_many :member_profiles, through: :users
end
