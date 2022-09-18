# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/subscriptions', type: :request do
  describe 'Member' do
    let(:current_user) { create(:user, :member) }

    describe 'Subscriptions CRUD' do
      context 'with valid params' do
        let!(:subscriptions) { create_list(:subscription, 5, type: 'annual') }
        let!(:subscriptions1) { create_list(:subscription, 3, type: 'monthly') }

        describe 'Index' do
          context 'when user signed in' do
            let(:headers) do
              auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
            end

            it 'returns 200 OK status' do
              get(api_v1_subscriptions_path, headers: headers)

              expect(response).to have_http_status(:ok)
              expect(json_response.count).to eq(8)
            end

            context 'when params contains annual type' do
              let(:subscription_params) { {type: 'annual'} }

              it 'returns 200 OK status' do
                get(api_v1_subscriptions_path, headers: headers, params: subscription_params)

                expect(response).to have_http_status(:ok)
                expect(json_response.count).to eq(5)
              end
            end

            context 'when params contains monthly type' do
              let(:subscription_params) { {type: 'monthly'} }

              it 'returns 200 OK status' do
                get(api_v1_subscriptions_path, headers: headers, params: subscription_params)

                expect(response).to have_http_status(:ok)
                expect(json_response.count).to eq(3)
              end
            end
          end

          context 'when user not authorized' do
            let(:headers) { {content_type: 'application/json', accept: 'application/json'} }

            it 'returns 200 OK status' do
              get(api_v1_subscriptions_path, headers: headers)

              expect(response).to have_http_status(:ok)
              expect(json_response.count).to eq(8)
            end

            context 'when params contains annual type' do
              let(:subscription_params) { {type: 'annual'} }

              it 'returns 200 OK status' do
                get(api_v1_subscriptions_path, headers: headers, params: subscription_params)

                expect(response).to have_http_status(:ok)
                expect(json_response.count).to eq(5)
              end
            end

            context 'when params contains monthly type' do
              let(:subscription_params) { {type: 'monthly'} }

              it 'returns 200 OK status' do
                get(api_v1_subscriptions_path, headers: headers, params: subscription_params)

                expect(response).to have_http_status(:ok)
                expect(json_response.count).to eq(3)
              end
            end
          end
        end
      end
    end
  end
end
