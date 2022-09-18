# frozen_string_literal: true

class UserMemberChallenge < ApplicationRecord
  CHALLENGE_STATUS = %w[unenrolled enrolled completed].freeze

  belongs_to :user
  belongs_to :member_challenge

  scope :filter_by_user, ->(user_id) { where(user_id: user_id, status: 'enrolled') }

  # PG_Search
  include PgSearch::Model
  multisearchable against: %i[user_id]
  pg_search_scope :search, against: %i[user_id], using: {tsearch: {prefix: true}}
end
