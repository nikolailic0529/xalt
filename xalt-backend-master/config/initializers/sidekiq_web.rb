# frozen_string_literal: true

require 'sidekiq/web'
require 'sidekiq-scheduler/web'

Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_interslice_session'
Sidekiq::Web.use Rack::Auth::Basic do |username, password|
  ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username),
                                              ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_UI_USERNAME'])) &
  ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password),
                                              ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_UI_PASSWORD']))
end
