# frozen_string_literal: true

module UserMemberChallenges
  class UserIdFilter < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return UserMemberChallenge.all if current_user.admin?

      return UserMemberChallenge.where(user_id: current_user.id, status: 'enrolled') if current_user.member?

      UserMemberChallenge.none
    end
  end
end
