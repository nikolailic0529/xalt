# frozen_string_literal: true

module JsonHelpers
  def json_response
    @json_response ||= JSON.parse(response.body)
  end

  def jsonapi_headers
    {'Content-Type' => 'application/vnd.api+json'}
  end
end

RSpec.configure do |config|
  config.include JsonHelpers, type: :request
  config.include JsonHelpers, type: :controller
end
