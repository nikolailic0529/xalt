# frozen_string_literal: true

class MemberChallenge < ApplicationRecord
  CATEGORIES = %w[walking dieting running weight_loss gym core].freeze

  belongs_to :user
  has_many :user_member_challenges
  has_many :user_member_challenge_check_ins

  scope :top, lambda {
    return where(id: UserMemberChallenge.select('member_challenge_id').where('"status" = ?', 'enrolled').group('member_challenge_id').order('count(member_challenge_id) desc').limit(50).map(&:member_challenge_id))
  }
  scope :enrolled, lambda { |user_id|
    return where(id: UserMemberChallenge.select('member_challenge_id').where(status: 'enrolled', user_id: user_id).map(&:member_challenge_id))
  }

  scope :search, lambda { |search_word|
    return where('lower(name) like ?', search_word).limit(50)
  }
  # PG_Search
  include PgSearch::Model
  multisearchable against: %i[name]
  pg_search_scope :search, against: %i[name], using: {tsearch: {prefix: true}}
end
