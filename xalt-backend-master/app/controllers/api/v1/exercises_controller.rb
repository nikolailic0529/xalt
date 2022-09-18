# frozen_string_literal: true

class Api::V1::ExercisesController < Api::V1::Coach::BaseCoachController
  def index
    exercises = find_exercises_grid_query

    render(json: exercises, each_serializer: ExerciseSerializer, status: :ok, include: inclusions_params)
  end

  def show
    exercise = find_exercise_query

    render(json: exercise, serializer: ExerciseSerializer, status: :ok)
  end

  def create
    exercise = run_command!(Exercises::Create, params_with_current_user)

    render(json: exercise, serializer: ExerciseSerializer, status: :ok)
  end

  def update
    exercise = run_command!(Exercises::Update, params_with_current_user.merge(exercise: find_exercise_query))

    render(json: exercise, serializer: ExerciseSerializer, status: :ok)
  end

  def destroy
    run_command!(Exercises::Delete, params_with_current_user.merge(exercise: find_exercise_query))

    render(json: {}, status: :ok)
  end

  protected

  def find_exercises_grid_query
    Exercises::GridQuery.call(params_with_current_user)
  end

  def find_exercises_query
    Exercises::BaseQuery.call(params_with_current_user)
  end

  def find_exercise_query
    @find_exercise_query ||= find_exercises_query.find(params_with_current_user[:id])
  end
end
