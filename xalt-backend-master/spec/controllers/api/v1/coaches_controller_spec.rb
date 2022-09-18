# frozen_string_literal: true
# # frozen_string_literal: true

# require 'rails_helper'

# RSpec.describe '/api/v1/coaches', type: :request do
#   describe 'Admin' do
#     let(:current_user) { create(:user, :admin) }

#     let(:headers) do
#       auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
#     end

#     describe 'Coaches' do
#       describe 'Index' do
#         context 'with out filter params' do
#           let!(:coaches) { create_list(:user, 6, :coach) }

#           it 'fetch coaches by admin' do
#             get(api_v1_coaches_path, headers: headers)

#             expect(response).to have_http_status(:ok)
#             expect(json_response.count).to eq(6)
#           end
#         end
#       end
#     end
#   end

#   describe 'Member' do
#     let(:current_user) { create(:user, :member) }

#     let(:headers) do
#       auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
#     end

#     describe 'Coaches' do
#       describe 'Index' do
#         let!(:fitnes_domain1) { create(:fitnes_domain) }
#         let!(:fitnes_domain2) { create(:fitnes_domain) }
#         let!(:fitnes_domain3) { create(:fitnes_domain) }

#         context 'with out filter params' do
#           let!(:current_user_with_fitnes_domain) { current_user.member_profile.fitnes_domains << fitnes_domain1 }
#           let!(:coaches_list1) { create_list(:user, 2, :coach, fitnes_domains: [fitnes_domain1, fitnes_domain2]) }
#           let!(:coaches_list2) { create_list(:user, 3, :coach, fitnes_domains: [fitnes_domain2, fitnes_domain3]) }
#           let!(:coaches_list3) { create_list(:user, 3, :coach, fitnes_domains: [fitnes_domain1, fitnes_domain3]) }

#           it 'fetch coaches by admin' do
#             get(api_v1_coaches_path, headers: headers)

#             expect(response).to have_http_status(:ok)
#             expect(json_response.count).to eq(5)
#           end
#         end

#         context 'with search param' do
#           before { current_user.member_profile.fitnes_domains << fitnes_domain1 }

#           let!(:coaches_list) { create_list(:user, 5, :coach, fitnes_domains: [fitnes_domain1, fitnes_domain2]) }
#           let!(:another_coach) { create(:user, :coach, fitnes_domains: [fitnes_domain1], name: 'Bilbo Beggins') }
#           let(:coach_params) { {search_string: 'bilbo'} }

#           it 'finds coach by name' do
#             get(api_v1_coaches_path, headers: headers, params: coach_params)

#             expect(response).to have_http_status(:ok)
#             expect(json_response[0]['name']).to eq(another_coach.name)
#           end
#         end
#       end
#     end
#   end
# end
