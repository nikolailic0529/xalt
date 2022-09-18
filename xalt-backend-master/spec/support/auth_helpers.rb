# frozen_string_literal: true

module AuthHelpers
  def auth_headers(user)
    # create client id and token
    client_id = SecureRandom.urlsafe_base64(nil, false)
    token     = SecureRandom.urlsafe_base64(nil, false)

    # store client + token in user's token hash
    user.tokens[client_id] = {
      token:  BCrypt::Password.create(token),
      expiry: (Time.current + 5.days).to_i
    }
    user.save!

    # Now we have to pretend like an API user has already logged in.
    # (When the user actually logs in, the server will send the user
    # - assuming that the user has  correctly and successfully logged in
    # - four auth headers. We are to then use these headers to access
    # things which are typically restricted
    # The following assumes that the user has received those headers
    # and that they are then using those headers to make a request
    user.build_auth_header(token, client_id)
  end
end

RSpec.configure do |config|
  config.include AuthHelpers
end
