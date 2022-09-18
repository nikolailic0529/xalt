# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/payments', type: :request do
  describe 'Member' do
    before {
      stub_request(:post, 'https://api.stripe.com/v1/tokens')
        .to_return(status: 200, body: {id: 'tok_123', card: {last4: '4242'}}.to_json)

      stub_request(:post, 'https://api.stripe.com/v1/customers')
        .to_return(status: 200, body: {id: 'cus_123'}.to_json)

      stub_request(:post, 'https://api.stripe.com/v1/subscriptions')
        .to_return(status: 200, body: {id: 'sub_123'}.to_json)
    }

    describe 'init action' do
      let!(:stripe_params) {
        {
          card_data:         {number: '4242 4242 4242 4242', exp_month: '10', exp_year: '2100', cvc: '123'},
          subscription_type: 'subscription'
        }
      }
      let!(:subscription) { create(:subscription) }
      let!(:current_user) { create(:user, role: 'member') }
      let!(:member_profile) { create(:member_profile, subscription: subscription, user: current_user) }
      let(:headers) do
        auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
      end

      context 'with valid params' do
        it 'get 200 ok status' do
          current_user.update(stripe: {stripe_id: nil, stripe_subscription_id: nil})
          current_user.reload
          post(api_v1_stripe_init_path, headers: headers, params: stripe_params)

          expect(response).to have_http_status(:ok)
        end

        it 'creates stripe card token' do
          current_user.update(stripe: {stripe_id: nil, stripe_subscription_id: nil})
          current_user.reload
          post(api_v1_stripe_init_path, headers: headers, params: stripe_params)

          expect(json_response['stripe']['stripe_card_token']).to be_truthy
          expect(json_response['stripe']['stripe_card_last4']).to eq stripe_params[:card_data][:number][-4..]
        end

        it 'creates stripe customer' do
          current_user.update(stripe: {stripe_id: nil, stripe_subscription_id: nil})
          current_user.reload
          post(api_v1_stripe_init_path, headers: headers, params: stripe_params)

          current_user.reload

          expect(json_response['stripe']['stripe_id']).to eq 'cus_123'
        end

        it 'creates stripe subscription' do
          current_user.update(stripe: {stripe_id: nil, stripe_subscription_id: nil})
          current_user.reload
          post(api_v1_stripe_init_path, headers: headers, params: stripe_params)

          current_user.reload

          expect(json_response['stripe']['stripe_subscription_id']).to eq 'sub_123'
        end
      end
    end
  end
end
