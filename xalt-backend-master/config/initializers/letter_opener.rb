# frozen_string_literal: true

require 'letter_opener'

LetterOpener.configure do |config|
  config.location = Rails.root.join('tmp/my_mails')
  config.message_template = :light
end
