# frozen_string_literal: true

class Api::V1::Member::ProgramsController < AuthenticatedController
  def index
    programs = find_programs_grid_query

    render(json: programs, each_serializer: ProgramsSerializer, status: :ok, include: inclusions_params)
  end

  def show
    program = find_program_query

    render(json: program, serializer: ProgramsSerializer, status: :ok, include: inclusions_params)
  end

  def update
    program = run_command!(Members::Programs::Update, params_with_current_user.merge(program: find_program_query))

    render(json: program, serializer: ProgramsSerializer, status: :ok)
  end

  private

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
