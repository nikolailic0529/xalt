# frozen_string_literal: true

class UserMemberChallengeCheckInsSerializer < ActiveModel::Serializer
  type :user_member_challenge_check_ins
  attributes :id, :user_id, :member_challenge_id, :checkin_date, :checkin_status, :comments, :proof

  belongs_to :user, serializer: ::UsersSerializer
  belongs_to :member_challenge, serializer: ::MemberChallengeSerializer
end
