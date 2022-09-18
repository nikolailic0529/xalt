# frozen_string_literal: true

module Users
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return User.all if current_user.admin?

      User.none
    end
  end
end
