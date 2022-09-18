# frozen_string_literal: true

class UserMemberChallengesSerializer < ActiveModel::Serializer
  type :user_member_challenges
  attributes :id, :user_id, :member_challenge_id, :status, :user

  belongs_to :user, serializer: ::UsersSerializer
  belongs_to :member_challenge, serializer: ::MemberChallengeSerializer
end
