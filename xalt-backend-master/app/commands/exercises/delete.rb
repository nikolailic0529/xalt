# frozen_string_literal: true

module Exercises
  class Delete < Core::BaseCommand
    attribute :current_user, User
    attribute :exercise,     Exercise

    validates :exercise, presence: true

    def authorized?
      exercise.user == current_user
    end

    def process
      delete_exercise
    end

    protected

    def delete_exercise
      exercise.destroy!
    end
  end
end
