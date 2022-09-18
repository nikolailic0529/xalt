# frozen_string_literal: true

class UserMemberChallengeCheckIn < ApplicationRecord
  belongs_to :user
  belongs_to :member_challenge
end
