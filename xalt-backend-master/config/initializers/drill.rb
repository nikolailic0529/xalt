# frozen_string_literal: true

require 'drill'

Drill.configure do |config|
  config.api_key = ENV.fetch('MANDRILL_API_KEY')

  config.delivery_method = :letter_opener if Rails.env.development? || ENV.fetch('LETTER_OPENER', 'false') == 'true'
end
