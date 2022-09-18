# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MarkMeetingAsFinishedJob, type: :job do
  describe 'Meeting' do
    let!(:member)  { create(:user, :member) }
    let!(:coach)   { create(:user, :coach) }

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
        described_class.perform_later({'meeting_id': meeting.id})

        expect(described_class).to have_been_enqueued.exactly(:once)
      end

      it 'enqueue the job with meeting' do
        ActiveJob::Base.queue_adapter = :test

        expect { described_class.perform_later({'meeting_id': meeting.id}) }.to have_enqueued_job(described_class)
      end
    end

    describe 'perform_now' do
      it 'updates meeting' do
        ActiveJob::Base.queue_adapter = :test

        expect {
          described_class.perform_now({'meeting_id': meeting.id})
          meeting.reload
        }.to change(meeting, :is_finished)
      end
    end

    describe 'when meeting already finished' do
      before { meeting.update(is_finished: true) }

      it 'does not update meeting' do
        ActiveJob::Base.queue_adapter = :test
        expect {
          described_class.perform_now({'meeting_id': meeting.id})
          meeting.reload
        }.not_to change(meeting, :is_finished)
      end
    end
  end
end
