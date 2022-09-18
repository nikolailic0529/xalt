# frozen_string_literal: true

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV.fetch('AWS_S3_ACCESS_KEY', ''),
    aws_secret_access_key: ENV.fetch('AWS_S3_SECRET_KEY', ''),
    region:                'us-east-2'
  }

  config.fog_directory = ENV.fetch('AWS_S3_BUCKET', '').to_s
end
