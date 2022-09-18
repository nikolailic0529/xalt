# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/member/programs', type: :request do
  describe 'Member' do
    let(:current_user)      { create(:user, :member) }
    let(:coach)             { create(:user, :coach) }
    let!(:programs) {
      create_list(:program, 5, :homework, coach_profile:  coach.coach_profile,
                                          member_profile: current_user.member_profile)
    }
    let!(:sessions) {
      create_list(:program, 3, :session, coach_profile:  coach.coach_profile,
                                         member_profile: current_user.member_profile)
    }
    let!(:another_programs) { create_list(:program, 5, :homework, coach_profile: coach.coach_profile) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Homeworks CRUD' do
      describe 'Update' do
        context 'with valid params' do
          let(:homework_params) { {completed: 'true'} }

          it 'returns 200 OK status' do
            put(api_v1_member_program_path(programs[0].id), headers: headers, params: homework_params)

            expect(response).to have_http_status(:ok)
            expect(json_response['completed']).to eq true
          end
        end

        context 'with invalid params' do
          let(:homework_params) { {completed: 'false'} }

          it 'returns 422 status' do
            put(api_v1_member_program_path(programs[0].id), headers: headers, params: homework_params)

            expect(response).to have_http_status(:unprocessable_entity)
          end
        end

        context 'without params' do
          it 'returns 422 status' do
            put(api_v1_member_program_path(programs[0].id), headers: headers)

            expect(response).to have_http_status(:unprocessable_entity)
          end
        end
      end

      describe 'Index' do
        context 'with valid params' do
          context 'without params' do
            it 'returns 200 OK status' do
              get(api_v1_member_programs_path, headers: headers)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq programs.size + sessions.size
            end
          end

          context 'with params' do
            context 'with homework parameter' do
              let!(:homework_param) { {program_type: 'homework'} }

              it 'returns 200 OK status' do
                get(api_v1_member_programs_path, headers: headers, params: homework_param)

                expect(response).to have_http_status(:ok)
                expect(json_response.size).to eq programs.size
              end
            end

            context 'with session parameter' do
              let!(:session_param) { {program_type: 'session'} }

              it 'returns 200 OK status' do
                get(api_v1_member_programs_path, headers: headers, params: session_param)

                expect(response).to have_http_status(:ok)
                expect(json_response.size).to eq sessions.size
              end
            end
          end
        end
      end

      describe 'Show' do
        context 'with valid params' do
          let(:homework_params) { {include: 'member_profile'} }

          it 'returns 200 OK status' do
            get(api_v1_member_program_path(programs[0].id), headers: headers, params: homework_params)

            expect(response).to have_http_status(:ok)
            expect(json_response['member_profile']['id']).to eq programs[0].member_profile_id
            expect(json_response['id']).to eq programs[0].id
          end
        end

        context 'with invalid params' do
          it 'raises exception' do
            expect { get(api_v1_member_program_path(another_programs[0].id), headers: headers) }
              .to raise_exception(ActiveRecord::RecordNotFound)
          end
        end
      end
    end
  end
end
