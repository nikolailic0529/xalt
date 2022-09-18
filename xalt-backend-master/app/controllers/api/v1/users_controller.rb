# frozen_string_literal: true

class Api::V1::UsersController < AuthenticatedController
  def index
    users = find_users_query

    render(json: users, each_serializer: UsersSerializer, status: :ok)
  end

  def create
    user = run_command!(Users::Create, params_with_current_user)

    render(json: user, serializer: UsersSerializer, status: :ok)
  end

  def show
    create_user = find_user_query

    render(json: create_user, serializer: UsersSerializer, status: :ok)
  end

  def update
    updated_user = run_command!(Users::Update, params_with_current_user.merge(user: find_user_query))

    render(json: updated_user, serializer: UsersSerializer, status: :ok)
  end

  def update_current_user
    updated_user = run_command!(Users::UpdateCurrentUser, params_with_current_user)

    render(json: updated_user, serializer: UsersSerializer, status: :ok)
  end

  def change_password
    updated_user = run_command!(Users::ChangePassword, params_with_current_user)

    render(json: updated_user, serializer: UsersSerializer, status: :ok)
  end

  def self_info
    render(json: current_user, serializer: UsersSerializer, status: :ok, include: inclusions_params)
  end

  protected

  def find_users_query
    Users::BaseQuery.call(params_with_current_user)
  end

  def find_user_query
    @find_user_query ||= find_users_query.find(params_with_current_user[:id])
  end
end
