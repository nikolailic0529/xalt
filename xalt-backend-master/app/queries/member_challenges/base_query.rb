# frozen_string_literal: true

module MemberChallenges
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return MemberChallenge.all if current_user.admin?

      # return MemberChallenge.where(is_private: false) if current_user.member?

      return MemberChallenge.all if current_user.member?

      MemberChallenge.none
    end
  end
end
