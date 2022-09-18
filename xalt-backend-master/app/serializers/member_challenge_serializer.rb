# frozen_string_literal: true

class MemberChallengeSerializer < ActiveModel::Serializer
  type :member_challenges
  attributes :id, :name, :description, :category, :schedule, :incentives, :video_url, :start, :end,
             :is_competition, :is_private, :corporate_tag, :user_member_challenges, :user_member_challenge_check_ins

  belongs_to :user, serializer: ::UsersSerializer
  has_many :user_member_challenges, serializer: ::UserMemberChallengesSerializer
  has_many :user_member_challenge_check_ins, serializer: ::UserMemberChallengeCheckInsSerializer

  def user_member_challenges
    object.user_member_challenges.where status: 'enrolled'
  end
end
