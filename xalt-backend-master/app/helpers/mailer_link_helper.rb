# frozen_string_literal: true

module MailerLinkHelper
  def host
    Rails.application.routes.default_url_options[:host]
  end

  def get_confirmation_link(user)
    "#{host}/confirm_user/#{user.confirmation_token}"
  end

  def get_reset_password_link(user)
    "#{ENV.fetch('FRONT_END_URL')}/restore-password/step-2?token=#{user.reset_password_token}"
  end

  def generate_app_link
    ENV.fetch('FRONT_END_URL').to_s
  end
end
