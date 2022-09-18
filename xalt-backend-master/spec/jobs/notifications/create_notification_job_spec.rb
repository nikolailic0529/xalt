# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notifications::CreateNotificationJob, type: :job do
  describe 'Notification' do
    let!(:member)  { create(:user, :member) }
    let!(:coach)   { create(:user, :coach) }
    let!(:program) {
      create(:program, :homework, coach_profile: coach.coach_profile, member_profile: member.member_profile)
    }
    let!(:notification) { {user_id: member.id, content: 'something', type: 'Notification::NewHomeworkNotification'} }

    describe 'perform_later' do
      it 'is enqueued' do
        ActiveJob::Base.queue_adapter = :test
        described_class.perform_later(notification)

        expect(described_class).to have_been_enqueued.exactly(:once)
      end

      it 'enqueue the job with program' do
        ActiveJob::Base.queue_adapter = :test

        expect { described_class.perform_later(notification) }.to have_enqueued_job(described_class)
      end
    end

    describe 'perform_now' do
      it 'creates notification' do
        ActiveJob::Base.queue_adapter = :test
        expect { described_class.perform_now(notification) }.to change(Notification, :count).by(1)
      end
    end
  end
end
