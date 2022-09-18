# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/analytics/widgets', type: :request do
  describe 'Coach' do
    let!(:current_user) { create(:user, :coach) }
    let!(:members) { create_list(:user, 10, role: 'member') }
    let!(:member_profiles) {
      members.each { |member|
        create(:member_profile, user: member, coach_profile: current_user.coach_profile)
      }
    }

    let!(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Widgets' do
      describe 'Index' do
        context 'when meetings count in this month by member' do
          let!(:session_program) {
            create(:program, :session, coach_profile:  current_user.coach_profile,
                                       member_profile: members[0].member_profile)
          }
          let!(:meetings) {
            create_list(:meeting, 5, coach_profile:  current_user.coach_profile,
                                     member_profile: members[0].member_profile,
                                     program:        session_program)
          }

          context 'with valid params' do
            let!(:widgets_params) {
              {widget_names:      'meetings_count_by_member',
               member_profile_id: members[0].member_profile.id}
            }

            it 'return 200 OK status' do
              get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

              expect(response).to have_http_status(:ok)
              expect(json_response['meetings_count_by_member'][0]['id'])
                .to eq members[0].member_profile.id
              expect(json_response['meetings_count_by_member'][0]['value']).to eq meetings.count
            end
          end

          context 'when coach has meetings with another members' do
            let!(:meetings1) {
              create_list(:meeting, 8, coach_profile:  current_user.coach_profile,
                                       member_profile: members[1].member_profile,
                                       program:        session_program)
            }

            let!(:widgets_params) {
              {widget_names:      'meetings_count_by_member',
               member_profile_id: members[0].member_profile.id}
            }

            it 'return 200 OK status' do
              get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

              expect(response).to have_http_status(:ok)
              expect(json_response['meetings_count_by_member'][0]['id'])
                .to eq members[0].member_profile.id
              expect(json_response['meetings_count_by_member'][0]['value']).to eq meetings.count
            end
          end
        end
      end
    end
  end
end
