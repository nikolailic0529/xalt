# frozen_string_literal: true

class Api::V1::Coach::ProgramsController < Api::V1::Coach::BaseCoachController
  def index
    programs = find_programs_grid_query

    render(json: programs, each_serializer: ProgramsSerializer, status: :ok, include: inclusions_params)
  end

  def show
    program = find_program_query

    render(json: program, serializer: ProgramsSerializer, status: :ok, include: inclusions_params)
  end

  def create
    program = run_command!(Coaches::Programs::Create, params_with_current_user)

    render(json: program, serializer: ProgramsSerializer, status: :ok)
  end

  def update
    program = run_command!(Coaches::Programs::Update, params_with_current_user.merge(program: find_program_query))

    render(json: program, serializer: ProgramsSerializer, status: :ok)
  end

  protected

  def find_programs_grid_query
    Programs::GridQuery.call(params_with_current_user)
  end

  def find_programs_query
    Programs::BaseQuery.call(params_with_current_user)
  end

  def find_program_query
    @find_program_query ||= find_programs_query.find(params_with_current_user[:id])
  end
end
