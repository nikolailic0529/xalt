# frozen_string_literal: true

module MemberChallenges
  class Delete < Core::BaseCommand
    attribute :current_user, User
    attribute :member_challenge, MemberChallenge

    validates :member_challenge, presence: true

    def authorized?
      member_challenge.user == current_user
    end

    def process
      delete_member_challenge
    end

    protected

    def delete_member_challenge
      member_challenge.destroy!
    end
  end
end
