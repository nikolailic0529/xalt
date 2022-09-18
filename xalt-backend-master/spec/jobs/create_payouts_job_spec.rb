# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreatePayoutsJob, type: :job do
  describe 'Payouts' do
    before {
      stub_request(:post, 'https://api.stripe.com/v1/payouts')
        .to_return(status: 200, body: {id: 'po_111'}.to_json)
    }

    let!(:coach) { create(:user, :coach) }

    describe 'perform_later' do
      it 'is enqueued' do
        ActiveJob::Base.queue_adapter = :test
        described_class.perform_later

        expect(described_class).to have_been_enqueued.exactly(:once)
      end
    end

    describe 'perform_now' do
      it 'creates billing record' do
        ActiveJob::Base.queue_adapter = :test

        coach.update(stripe: {last_payout_id: 'po_123', payouts: [{id: 'po_123', status: 'paid'}]})
        coach.coach_profile.update(earnings: 10.0)
        coach.reload

        expect { described_class.perform_now }.to change(BillingRecord, :count).by(1)
        coach.reload
        expect(coach.stripe['last_payout_id']).to eq('po_111')
      end

      it 'does not create billing record' do
        ActiveJob::Base.queue_adapter = :test

        coach.update(stripe: {last_payout_id: 'po_123', payouts: [{id: 'po_123', status: 'paid'}]})
        coach.coach_profile.update(earnings: 0.9)
        coach.reload

        expect { described_class.perform_now }.to change(BillingRecord, :count).by(0)
      end
    end

    describe 'when the last payout was not paid' do
      it 'does not create billing record' do
        ActiveJob::Base.queue_adapter = :test
        coach.update(stripe: {last_payout_id: 'po_123', payouts: [{id: 'po_123', status: 'failed'}]})
        coach.coach_profile.update(earnings: 10.0)
        coach.reload

        expect { described_class.perform_now }.to change(BillingRecord, :count).by(0)
      end
    end
  end
end
