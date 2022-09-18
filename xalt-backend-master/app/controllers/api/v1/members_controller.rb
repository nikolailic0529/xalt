# frozen_string_literal: true

class Api::V1::MembersController < AuthenticatedController
  def index
    members = find_members_grid_query

    render(json: members, each_serializer: UsersSerializer, status: :ok, include: inclusions_params)
  end

  protected

  def find_members_grid_query
    Members::GridQuery.call(params_with_current_user)
  end
end
