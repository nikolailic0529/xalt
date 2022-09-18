# frozen_string_literal: true

module Members
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return User.where(role: 'member') if current_user.admin?
      return current_user.members if current_user.coach?

      User.none
    end
  end
end
