# frozen_string_literal: true

class Api::V1::CoachesController < ApplicationController
  def index
    coaches = find_coaches_grid_query

    render(json: coaches, each_serializer: UsersSerializer, status: :ok, include: inclusions_params)
  end

  protected

  def find_coaches_grid_query
    Coaches::GridQuery.call(params_with_current_user)
  end

  def params_with_current_user
    jsonapi_params_to_query_options.merge!(current_user: current_user)
  end
end
