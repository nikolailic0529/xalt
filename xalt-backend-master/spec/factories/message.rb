# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    content { 'Hello Ruby' }
    conversation { create(:conversation) }
    sender { conversation.users.first }
  end
end
