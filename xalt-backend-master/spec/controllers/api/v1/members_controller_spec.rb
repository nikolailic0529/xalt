# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/members', type: :request do
  describe 'Admin' do
    let(:current_user) { create(:user, :admin) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Members' do
      describe 'Index' do
        context 'with out filter params' do
          let!(:members) { create_list(:user, 6, :member) }

          it 'fetch members by admin' do
            get(api_v1_members_path, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.count).to eq(6)
          end
        end
      end
    end
  end

  describe 'Coach' do
    let(:current_user) { create(:user, :coach) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Members' do
      describe 'Index' do
        context 'with out filter params' do
          let!(:member_list1) { create_list(:user, 6, :member, coach_profile: current_user.coach_profile) }
          let!(:member_list_without_coache) { create_list(:user, 7, :member) }

          it 'get members with current coach' do
            get(api_v1_members_path, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.count).to eq(member_list1.size)
          end
        end

        context 'with search param' do
          context 'when searched member fetched to current coach' do
            let!(:member_list1) { create_list(:user, 6, :member, coach_profile: current_user.coach_profile) }
            let!(:new_member) { create(:user, :member, coach_profile: current_user.coach_profile, name: 'John Snow') }
            let(:member_params) { {search_string: 'snow'} }

            it 'searches member by name' do
              get(api_v1_members_path, headers: headers, params: member_params)

              expect(response).to have_http_status(:ok)
              expect(json_response[0]['id']).to eq new_member.id
            end
          end

          context 'when searched member is not fetched to current coach' do
            let!(:member_list1) { create_list(:user, 6, :member, coach_profile: current_user.coach_profile) }
            let!(:new_member) { create(:user, :member, name: 'John Snow') }
            let(:member_params) { {search_string: 'snow'} }

            it 'gets nothing' do
              get(api_v1_members_path, headers: headers, params: member_params)

              expect(response).to have_http_status(:ok)
              expect(json_response).to eq []
            end
          end
        end
      end
    end
  end
end
