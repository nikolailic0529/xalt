# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/fitnes_domains', type: :request do
  describe 'Admin' do
    let(:current_user) { create(:user, :admin) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'FitnesDomains CRUD' do
      describe 'Index' do
        context 'with out filter params' do
          let!(:fitnes_domains) { create_list(:fitnes_domain, 6) }

          it 'fetch fitnes domains by admin' do
            get(api_v1_fitnes_domains_path, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.count).to eq(6)
          end
        end
      end
    end
  end

  # describe 'Not admin' do
  # end
end
