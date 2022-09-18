# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MessageBroadcastJob, type: :job do
  describe 'perform_later' do
    let!(:member)       { create(:user, :member) }
    let!(:coach)        { create(:user, :coach) }
    let!(:conversation) { create(:conversation, users: [member, coach]) }
    let!(:message)      { create(:message, conversation: conversation, sender: member) }

    it 'is enqueued' do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_later(message.id)

      expect(described_class).to have_been_enqueued.exactly(:once)
    end

    it 'is enqueued with message' do
      ActiveJob::Base.queue_adapter = :test

      expect { described_class.perform_later(message.id) }.to have_enqueued_job(described_class).with(message.id)
    end

    it 'broadcasts the message' do
      ActiveJob::Base.queue_adapter = :test
      described_class.perform_now(message.id)
      result = JSON.parse(ActionCable.server.pubsub.send(:channels_data)["ChatRoom-#{conversation.id}"][0])

      expect(result['id']).to eq message.id
      expect(result['created_at']).not_to eq nil
      expect(result['conversation_id']).to eq conversation.id
      expect(result['content']).to eq message.content
      expect(result['sender_id']).to eq member.id
      expect(result['participants']).to include(coach.id)
      expect(result['participants']).to include(member.id)
    end

    it 'raises exception' do
      ActiveJob::Base.queue_adapter = :test
      expect { described_class.perform_now('something wrong') }.to raise_exception(ActiveRecord::RecordNotFound)
    end
  end
end
