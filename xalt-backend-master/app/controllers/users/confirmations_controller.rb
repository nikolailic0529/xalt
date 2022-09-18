# frozen_string_literal: true

class Users::ConfirmationsController < ApplicationController
  def confirm_user
    user = User.find_by!(confirmation_token: params[:id])
    user.confirm unless user.confirmed?
    redirect_to "#{ENV.fetch('FRONT_END_URL')}/login"
  end
end
