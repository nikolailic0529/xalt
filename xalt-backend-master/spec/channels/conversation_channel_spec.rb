# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConversationChannel, type: :channel do
  let!(:current_user)   { create(:user, :coach) }
  let!(:other_user)   { create(:user, :member) }
  let!(:conversation) { create(:conversation, users: [current_user, other_user]) }
  let(:my_headers) do
    auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
  end

  it 'rejects when no room id' do
    subscribe

    expect(subscription).to be_rejected
  end

  it 'rejects when ChatRoom id is invalid' do
    subscribe(conversation_id: -1)

    expect(subscription).to be_rejected
  end

  it 'subscribes to a stream when room id is provided' do
    subscribe(conversation_id: conversation.id)

    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("ChatRoom-#{conversation.id}")
  end
end
