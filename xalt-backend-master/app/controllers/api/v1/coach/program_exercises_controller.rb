# frozen_string_literal: true

class Api::V1::Coach::ProgramExercisesController < Api::V1::Coach::BaseCoachController
  def destroy
    run_command!(Coaches::ProgramExercises::Delete,
                 params_with_current_user.merge(program_exercise: find_program_exercise_query))

    render(json: {}, status: :ok)
  end

  protected

  def find_program_exercises_query
    ProgramExercises::BaseQuery.call(params_with_current_user)
  end

  def find_program_exercise_query
    @find_program_exercise_query ||= find_program_exercises_query.find(params_with_current_user[:id])
  end
end
