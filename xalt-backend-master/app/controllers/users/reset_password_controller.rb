# frozen_string_literal: true

class Users::ResetPasswordController < DeviseTokenAuth::PasswordsController
  def edit
    user = User.find_by!(email: params['email'])
    user.send_reset_password_instructions
    render(json: {}, status: :ok)
  end

  def update
    updated_user = run_command!(Users::ResetPassword,
                                {user: user, password: params[:password],
                                password_confirmation: params[:password_confirmation]})

    render(json: updated_user, serializer: UsersSerializer, status: :ok)
  end

  private

  def user
    @user ||= User.find_by!(reset_password_token: params[:reset_password_token])
  end
end
