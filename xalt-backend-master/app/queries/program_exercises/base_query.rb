# frozen_string_literal: true

module ProgramExercises
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return ProgramExercise.all if current_user.admin?

      if current_user.coach?
        return ProgramExercise.joins(program: :coach_profile)
                              .where('programs.coach_profile_id = ?', current_user.coach_profile.id)
      end

      if current_user.member?
        return ProgramExercise.joins(program: :member_profile)
                              .where('programs.coach_profile_id = ?', current_user.member_profile.id)
      end

      ProgramExercise.none
    end
  end
end
