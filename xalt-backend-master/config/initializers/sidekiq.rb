# frozen_string_literal: true

Sidekiq.configure_server do |config|
  config.redis = {
    url:       ENV.fetch('REDIS_URL', 'redis://localhost:6379/1'),
    namespace: ENV.fetch('REDIS_NAMESPACE') { "xalt-#{Rails.env}" }
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url:       ENV.fetch('REDIS_URL', 'redis://localhost:6379/1'),
    namespace: ENV.fetch('REDIS_NAMESPACE') { "xalt-#{Rails.env}" }
  }
end

Sidekiq::Extensions.enable_delay!
