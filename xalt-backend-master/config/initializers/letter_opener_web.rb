# frozen_string_literal: true

require 'letter_opener_web'

LetterOpenerWeb.configure do |config|
  config.letters_location = Rails.root.join('tmp/my_mails')
end
