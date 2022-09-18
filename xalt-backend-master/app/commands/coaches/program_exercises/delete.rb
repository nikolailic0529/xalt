# frozen_string_literal: true

module Coaches
  module ProgramExercises
    class Delete < Core::BaseCommand
      attribute :current_user,     User
      attribute :program_exercise, ProgramExercise

      def authorized?
        current_user.coach? || current_user.admin?
      end

      def process
        delete_program_exercise
      end

      protected

      def delete_program_exercise
        program_exercise.destroy
      end
    end
  end
end
