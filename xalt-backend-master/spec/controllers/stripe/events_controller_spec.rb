# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/stripe/events', type: :request do
  describe 'Event invoice' do
    before {
      stub_request(:get, 'https://api.stripe.com/v1/subscriptions/sub_123')
        .to_return(status: 200, body: {
          id:                   'sub_123',
          current_period_start: '01.01.2021',
          current_period_end:   '01.02.2021'
        }.to_json)
    }

    describe 'init action' do
      let!(:subscription) { create(:subscription) }
      let!(:current_user) {
        create(:user, role: 'member', stripe: {stripe_subscription_id: 'sub_123', stripe_id: 'cus_123'})
      }
      let!(:member_profile) { create(:member_profile, subscription: subscription, user: current_user) }
      let!(:stripe_subscription_data) {
        {
          id:                   'sub_123',
          current_period_start: '01.01.2021',
          current_period_end:   '01.02.2021'
        }
      }

      context 'with valid params' do
        let!(:event) {
          {
            type: 'invoice.payment_succeeded',
            data: {
              object: {
                customer: current_user.stripe['stripe_id']
              }
            }
          }
        }

        it 'get 200 ok status' do
          post(invoice_stripe_events_path, params: event)

          expect(response).to have_http_status(:ok)
        end

        it 'updates subscription data' do
          post(invoice_stripe_events_path, params: event)

          current_user.reload

          expect(stripe_subscription_data[:id]).to eq current_user.stripe['stripe_subscription_id']
          expect(stripe_subscription_data[:current_period_start]).to eq current_user.stripe['current_period_start']
          expect(stripe_subscription_data[:current_period_end]).to eq current_user.stripe['current_period_end']
        end

        it 'creates billing record' do
          expect { post(invoice_stripe_events_path, params: event) }
            .to change(BillingRecord, :count).by(1)
        end
      end
    end
  end

  describe 'Event account' do
    describe 'init action' do
      let!(:current_user) { create(:user, :coach, stripe: {stripe_account_id: 'acc_123'}) }
      let!(:coach_profile) { create(:coach_profile, user: current_user) }

      context 'with valid params' do
        let!(:event) {
          {
            type: 'account.updated',
            data: {
              object: {
                id:                current_user.stripe['stripe_account_id'],
                charges_enabled:   'true',
                details_submitted: 'false',
                payouts_enabled:   'true'
              }
            }

          }
        }

        it 'get 200 ok status' do
          post(account_stripe_events_path, params: event)

          expect(response).to have_http_status(:ok)
        end

        it 'updates account data' do
          post(account_stripe_events_path, params: event)

          current_user.reload

          expect(current_user.stripe['charges_enabled']).to eq 'true'
          expect(current_user.stripe['details_submitted']).to eq 'false'
          expect(current_user.stripe['payouts_enabled']).to eq 'true'
        end
      end
    end
  end

  describe 'Event payout' do
    describe 'init action' do
      let!(:current_user) {
        create(:user, :coach, stripe: {stripe_account_id: 'acc_123', stripe_bank_account_id: 'ba_123'})
      }
      let!(:billing_record) {
        create(:billing_record, coach_profile: current_user.coach_profile, subscription: nil, direction: 'outcoming')
      }

      context 'with valid params' do
        let!(:event_paid) {
          {
            type: 'payout.paid',
            data: {
              object: {
                id:          'p_123',
                destination: 'ba_123',
                currency:    'usd',
                amount:      '10',
                created:     '1623052649',
                source_type: 'card',
                status:      'paid'
              }
            }

          }
        }

        it 'get 200 ok status' do
          post(payout_stripe_events_path, params: event_paid)

          expect(response).to have_http_status(:ok)
        end

        context 'when payout paid' do
          let!(:event_paid) {
            {
              type: 'payout.paid',
              data: {
                object: {
                  id:          'p_123',
                  destination: 'ba_123',
                  currency:    'usd',
                  amount:      '10',
                  created:     '1623052649',
                  source_type: 'card',
                  status:      'paid'
                }
              }

            }
          }

          it 'updates user stripe data' do
            current_user.coach_profile.update(earnings: 10.0, verified: true)
            current_user.coach_profile.reload

            post(payout_stripe_events_path, params: event_paid)

            current_user.reload

            expect(current_user.coach_profile.earnings).to eq 0.0
            expect(current_user.stripe['payouts'].length).to eq 1
            expect(current_user.stripe['payouts'][0]['status']).to eq 'paid'
            expect(current_user.stripe['payouts'][0]['id']).to eq 'p_123'
          end
        end

        context 'when payout paid failed' do
          let!(:event_failed) {
            {
              type: 'payout.paid',
              data: {
                object: {
                  id:          'p_123',
                  destination: 'ba_123',
                  currency:    'usd',
                  amount:      '10',
                  created:     '1623052649',
                  source_type: 'card',
                  status:      'failed'
                }
              }
            }
          }

          it 'updates user stripe data' do
            current_user.coach_profile.update(earnings: 10.0, verified: true)
            current_user.coach_profile.reload

            post(payout_stripe_events_path, params: event_failed)

            current_user.reload

            expect(current_user.coach_profile.earnings).to eq 10.0
            expect(current_user.stripe['payouts'].length).to eq 1
            expect(current_user.stripe['payouts'][0]['status']).to eq 'failed'
            expect(current_user.stripe['payouts'][0]['id']).to eq 'p_123'
          end
        end
      end
    end
  end
end
