# frozen_string_literal: true

class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :validate_role, only: [:create]

  # rubocop:disable Lint/UselessMethodDefinition
  def create
    super
  end
  # rubocop:enable Lint/UselessMethodDefinition

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name terms_and_privacy_confirmed role])
  end

  def validate_role
    # rubocop:disable Style/GuardClause
    if params['role'].nil? || (User::ROLES - ['admin']).exclude?(params['role'].downcase)
      render(json: {success: false, errors: ['Invalid Role']}, status: :unprocessable_entity)
    end
    # rubocop:enable Style/GuardClause
  end
end
