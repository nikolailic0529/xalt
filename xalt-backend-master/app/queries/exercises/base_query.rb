# frozen_string_literal: true

module Exercises
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Exercise.all if current_user.admin?

      return Exercise.where(is_private: false).or(current_user.exercises) if current_user.coach?

      Exercise.none
    end
  end
end
