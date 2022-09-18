# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateBillingRecordJob, type: :job do
  describe 'BillingRecord' do
    let!(:subscription) { create(:subscription) }
    let!(:coach) { create(:user, :coach) }
    let!(:member) { create(:user, :member, subscription: subscription) }

    let!(:session_program) {
      create(:program, :session, coach_profile: coach.coach_profile, member_profile: member.member_profile)
    }

    let!(:meeting) {
      create(:meeting, coach_profile: coach.coach_profile, member_profile: member.member_profile,
     program: session_program)
    }

    describe 'perform_later' do
      it 'is enqueued' do
        ActiveJob::Base.queue_adapter = :test
        described_class.perform_later({meeting_id: meeting.id})

        expect(described_class).to have_been_enqueued.exactly(:once)
      end

      it 'enqueue the job with meeting' do
        ActiveJob::Base.queue_adapter = :test

        expect { described_class.perform_later({meeting_id: meeting.id}) }.to have_enqueued_job(described_class)
      end
    end

    describe 'perform_now' do
      it 'creates BillingRecords' do
        ActiveJob::Base.queue_adapter = :test
        expect { described_class.perform_now({meeting_id: meeting.id}) }.to change(BillingRecord, :count).by(2)
      end

      it 'change coach earnings' do
        ActiveJob::Base.queue_adapter = :test
        expect {
          described_class.perform_now({meeting_id: meeting.id})
          coach.coach_profile.reload
        }.to change(coach.coach_profile, :earnings)
      end
    end
  end
end
