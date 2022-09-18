# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/stripe/accounts', type: :request do
  describe 'GET current_account' do
    before {
      stub_request(:get, 'https://api.stripe.com/v1/accounts/acc_123')
        .to_return(status: 200, body: {
          id:                'acc_123',
          charges_enabled:   'true',
          details_submitted: 'true',
          payouts_enabled:   'true'
        }.to_json)
    }

    let!(:current_user) { create(:user, :coach, stripe: {stripe_account_id: 'acc_123'}) }
    let!(:coach_profile) { create(:coach_profile, user: current_user) }
    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    context 'with valid params' do
      it 'get 200 ok status' do
        get(current_account_stripe_accounts_path, headers: headers)

        expect(response).to have_http_status(:ok)
        expect(json_response['id']).to eq 'acc_123'
        expect(json_response['charges_enabled']).to eq 'true'
        expect(json_response['details_submitted']).to eq 'true'
        expect(json_response['payouts_enabled']).to eq 'true'
      end
    end
  end

  describe 'POST create_link' do
    before {
      stub_request(:post, 'https://api.stripe.com/v1/accounts')
        .to_return(status: 200, body: {
          id:                'acc_123',
          charges_enabled:   'false',
          details_submitted: 'false',
          payouts_enabled:   'false'
        }.to_json)

      stub_request(:post, 'https://api.stripe.com/v1/account_links')
        .to_return(status: 200, body: {
          object:     'account_link',
          created:    '1622521328',
          expires_at: '1622521628',
          url:        'https://connect.stripe.com/setup/s/cKbFppRF5Pbq'
        }.to_json)
    }

    let!(:current_user) { create(:user, :coach, stripe: {}) }
    let!(:coach_profile) { create(:coach_profile, user: current_user) }
    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    context 'with valid params' do
      it 'get 200 ok status' do
        post(create_link_stripe_accounts_path, headers: headers)

        current_user.reload

        expect(response).to have_http_status(:ok)
      end

      it 'creates stripe account' do
        post(create_link_stripe_accounts_path, headers: headers)

        current_user.reload

        expect(current_user.stripe['stripe_account_id']).to eq 'acc_123'
        expect(current_user.stripe['charges_enabled']).to eq false
        expect(current_user.stripe['details_submitted']).to eq false
        expect(current_user.stripe['payouts_enabled']).to eq false
      end

      it 'creates stripe account link' do
        post(create_link_stripe_accounts_path, headers: headers)

        current_user.reload

        expect(response).to have_http_status(:ok)
        expect(json_response).to have_key('object')
        expect(json_response).to have_key('created')
        expect(json_response).to have_key('expires_at')
        expect(json_response).to have_key('url')
      end
    end
  end

  describe 'POST create_bank_account' do
    before {
      stub_request(:post, 'https://api.stripe.com/v1/accounts/acc_123/external_accounts')
        .to_return(status: 200, body: {
          id:                  'ba_123',
          account:             'acc_123',
          account_holder_name: 'Jane Austen',
          account_holder_type: 'individual',
          country:             'US',
          currency:            'usd',
          routing_number:      '110000000'
        }.to_json)
    }

    let!(:current_user) { create(:user, :coach, stripe: {stripe_account_id: 'acc_123'}) }
    let!(:coach_profile) { create(:coach_profile, user: current_user) }
    let!(:bank_data) {
      {
        id:                  'ba_123',
        account_holder_name: 'Jane Austen',
        country:             'US',
        routing_number:      '110000000',
        account_number:      '000123456789'
      }
    }
    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    context 'with valid params' do
      it 'get 200 ok status' do
        post(create_bank_account_stripe_accounts_path, headers: headers, params: {bank_data: bank_data})

        current_user.reload

        expect(response).to have_http_status(:ok)
      end

      it 'creates stripe bank account' do
        post(create_bank_account_stripe_accounts_path, headers: headers, params: {bank_data: bank_data})

        current_user.reload

        response_external_account = json_response['stripe']['external_account']
        user_external_account = current_user.stripe['external_account']

        expect(json_response['stripe']['stripe_account_id']).to eq current_user.stripe['stripe_account_id']
        expect(json_response['stripe']['stripe_bank_account_id']).to eq current_user.stripe['stripe_bank_account_id']
        expect(response_external_account['country']).to eq user_external_account['country']
        expect(response_external_account['currency']).to eq user_external_account['currency']
        expect(response_external_account['account_holder_name']).to eq user_external_account['account_holder_name']
        expect(response_external_account['account_holder_type']).to eq user_external_account['account_holder_type']
        expect(response_external_account['routing_number']).to eq user_external_account['routing_number']
      end
    end
  end

  describe 'PUT update_bank_account' do
    before {
      stub_request(:post, 'https://api.stripe.com/v1/accounts/acc_123/external_accounts')
        .to_return(status: 200, body: {
          id:                  'ba_123',
          account:             'acc_123',
          account_holder_name: 'Jane Austen',
          account_holder_type: 'individual',
          country:             'US',
          currency:            'usd',
          routing_number:      '110000000'
        }.to_json)

      stub_request(:post, 'https://api.stripe.com/v1/accounts/acc_123/external_accounts/ba_123')
        .to_return(status: 200, body: {
          id:                  'ba_123',
          account:             'acc_123',
          account_holder_name: 'Jane Test',
          account_holder_type: 'individual',
          country:             'US',
          currency:            'usd',
          routing_number:      '110000001'
        }.to_json)
    }

    let!(:current_user) { create(:user, :coach, stripe: {stripe_account_id: 'acc_123'}) }
    let!(:coach_profile) { create(:coach_profile, user: current_user) }
    let!(:bank_data) {
      {
        id:                  'ba_123',
        account_holder_name: 'Jane Test',
        country:             'US',
        routing_number:      '110000001',
        account_number:      '000123456789'
      }
    }
    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    context 'with valid params' do
      it 'get 200 ok status' do
        put(update_bank_account_stripe_accounts_path, headers: headers, params: {bank_data: bank_data})

        current_user.reload

        expect(response).to have_http_status(:ok)
      end

      it 'updates stripe bank account' do
        post(create_bank_account_stripe_accounts_path, headers: headers, params: {bank_data: bank_data})

        current_user.reload

        put(update_bank_account_stripe_accounts_path, headers: headers, params: {bank_data: bank_data})

        current_user.reload

        response_external_account = json_response['stripe']['external_account']
        user_external_account = current_user.stripe['external_account']

        expect(json_response['stripe']['stripe_account_id']).to eq current_user.stripe['stripe_account_id']
        expect(json_response['stripe']['stripe_bank_account_id']).to eq current_user.stripe['stripe_bank_account_id']
        expect(response_external_account['country']).to eq user_external_account['country']
        expect(response_external_account['currency']).to eq user_external_account['currency']
        expect(response_external_account['account_holder_name']).to eq user_external_account['account_holder_name']
        expect(response_external_account['account_holder_type']).to eq user_external_account['account_holder_type']
        expect(response_external_account['routing_number']).to eq user_external_account['routing_number']
      end
    end
  end
end
