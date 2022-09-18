# frozen_string_literal: true

require 'google/apis/calendar_v3'

class GoogleCalendar
  def calendar
    calendar = Google::Apis::CalendarV3::CalendarService.new
    calendar.authorization = access_token['access_token']
    calendar
  end

  def access_token
    # TODO: Hide this tokens to creds
    token = '1//04WKtDYPPNbHzCgYIARAAGAQSNwF-L9Irv3__QRkNxj1dRdF7VjlAt5rf3InagieyH2YaLnAqhtkAmBb3yzcF5gN-hDhBvBjVmOc'

    params = {
      refresh_token: token,
      client_id:     '554193913035-eg6akn25cp8qsrqgijb126jfspfoqtj8.apps.googleusercontent.com',
      client_secret: '6ePKItbry6rGOrxH5n_1ITjg',
      grant_type:    'refresh_token'
    }

    url = URI.parse('https://accounts.google.com')

    http             = Net::HTTP.new(url.host, url.port)
    http.use_ssl     = true
    http.verify_mode = OpenSSL::SSL::VERIFY_PEER

    request = Net::HTTP::Post.new('/o/oauth2/token')
    request.set_form_data(params)
    response = http.request(request)

    JSON.parse(response.body)
  end
end
