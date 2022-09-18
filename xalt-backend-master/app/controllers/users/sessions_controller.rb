# frozen_string_literal: true

class Users::SessionsController < DeviseTokenAuth::SessionsController
  # https://github.com/lynndylanhurley/devise_token_auth/issues/567
  def render_create_success
    if current_user.nil?
      head :unauthorized
    else
      render(
        json:       current_user,
        serializer: UsersSerializer,
        status:     :ok
        # include:    ''
      )
    end
  end
end
