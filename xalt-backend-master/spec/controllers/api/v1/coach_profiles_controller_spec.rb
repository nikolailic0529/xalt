# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/coach_profiles', type: :request do
  describe 'Coach' do
    let(:current_user) { create(:user, role: 'coach') }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'CoachProfiles CRUD' do
      context 'with valid params' do
        let!(:fitnes_domains) { create_list(:fitnes_domain, 6) }
        let!(:last_3_fitnes_domains) { fitnes_domains.last(3) }

        describe 'Create' do
          let!(:coach_profile_params) do
            {
              about:                "I'm perfect Coach",
              social_network_links: {linkedin: 'https://linkedin.com/stub'},
              fitnes_domain_ids:    last_3_fitnes_domains.pluck(:id).join(',')
            }
          end

          it 'returns 200 OK status' do
            post(api_v1_coach_profiles_path, headers: headers, params: coach_profile_params)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('fitnes_domains',
                                        'documents',
                                        'user',
                                        'programs',
                                        'coach_documents'))
              .to eq(current_user.coach_profile.attributes.except('user_id',
                                                                  'documents',
                                                                  'created_at',
                                                                  'rehabilitation',
                                                                  'updated_at'))
            expect(json_response['fitnes_domains']).to match_array(
              current_user.coach_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )

            expect(json_response['user'].except('avatar')).to eq(
              current_user.coach_profile.user.attributes.except(
                'created_at', 'updated_at', 'avatar', 'allow_password_change', 'confirmation_sent_at',
                'confirmation_token', 'confirmed_at', 'current_sign_in_at', 'current_sign_in_ip', 'deleted',
                'encrypted_password', 'last_sign_in_at', 'last_sign_in_ip', 'nickname', 'provider',
                'remember_created_at', 'reset_password_sent_at', 'reset_password_token', 'sign_in_count', 'tokens',
                'uid', 'unconfirmed_email'
              )
            )
          end

          context 'with invalid params' do
            context 'when coach tries to send verified params' do
              before { coach_profile_params.update({verified: 'true', xalt_sertified: 'true'}) }

              it 'returns 422' do
                post(api_v1_coach_profiles_path, headers: headers, params: coach_profile_params)

                expect(response).to have_http_status(:unprocessable_entity)
              end
            end

            context 'when coach already has coach_profile' do
              let!(:coach_profile) {
                create(:coach_profile, user: current_user, fitnes_domains: last_3_fitnes_domains, earnings: 80.00111111)
              }

              it 'returns 422' do
                post(api_v1_coach_profiles_path, headers: headers, params: coach_profile_params)

                expect(response).to have_http_status(:unprocessable_entity)
                expect(json_response['errors'][0]['detail']).to eq 'Coach profile for this user already exists'
              end
            end
          end
        end

        describe 'Show' do
          let!(:coach_profile) {
            create(:coach_profile, user: current_user, fitnes_domains: last_3_fitnes_domains, earnings: 80.00111111)
          }
          let!(:coach_profile_params) { {include: 'fitnes_domains'} }

          it 'returns 200 OK status' do
            get(api_v1_coach_profile_path(coach_profile.id), headers: headers, params: coach_profile_params)

            expect(response).to have_http_status(:ok)
            expect(
              json_response.except('fitnes_domains',
                                   'coach_documents',
                                   'documents',
                                   'earnings')
            ).to eq(current_user.coach_profile.attributes.except('user_id',
                                                                 'coach_documents',
                                                                 'documents',
                                                                 'created_at',
                                                                 'rehabilitation',
                                                                 'updated_at',
                                                                 'earnings'))
            expect(json_response['earnings']).to eq current_user.coach_profile.earnings.round(2)
            expect(json_response['fitnes_domains']).to match_array(
              current_user.coach_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )
          end
        end

        describe 'Update' do
          let!(:coach_profile) { create(:coach_profile, user: current_user, fitnes_domains: last_3_fitnes_domains) }
          let(:coach_profile_params) do
            {
              about:                'Changed info',
              social_network_links: {linkedin: 'https://linkedin.com/test'},
              fitnes_domain_ids:    last_3_fitnes_domains.pluck(:id).join(',')
            }
          end

          it 'returns 200 OK status' do
            put(api_v1_coach_profile_path(coach_profile.id), params: coach_profile_params, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response['fitnes_domains']).to match_array(
              current_user.coach_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )
          end

          context 'with invalid params' do
            before { coach_profile_params.update({verified: 'true', xalt_sertified: 'true'}) }

            it 'returns 422' do
              post(api_v1_coach_profiles_path, headers: headers, params: coach_profile_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end
        end
      end
    end
  end

  describe 'Member' do
    let(:current_user) { create(:user, :member) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'CoachProfiles CRUD' do
      context 'with valid params' do
        let!(:fitnes_domains) { create_list(:fitnes_domain, 6) }
        let!(:last_3_fitnes_domains) { fitnes_domains.last(3) }

        describe 'Create' do
          let(:coach_profile_params) do
            {
              about:                "I'm perfect Coach",
              social_network_links: {linkedin: 'https://linkedin.com/stub'},
              fitnes_domain_ids:    last_3_fitnes_domains.pluck(:id).join(',')
            }
          end

          it 'returns 401 status' do
            post(api_v1_coach_profiles_path, headers: headers, params: coach_profile_params)

            expect(response).to have_http_status(:unauthorized)
          end
        end

        describe 'Show' do
          before { current_user.member_profile.update(fitnes_domains: last_3_fitnes_domains) }

          let!(:coach_profile) { create(:coach_profile, user: current_user, fitnes_domains: last_3_fitnes_domains) }

          it 'gets coach profile' do
            get(api_v1_coach_profile_path(coach_profile.id), headers: headers)

            expect(json_response['id']).to eq coach_profile.id
          end
        end
      end
    end
  end

  describe 'Admin' do
    let(:current_user) { create(:user, role: 'admin') }
    let(:coach)        { create(:user, role: 'coach') }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'CoachProfiles CRUD' do
      context 'with valid params' do
        let!(:fitnes_domains) { create_list(:fitnes_domain, 6) }
        let!(:last_3_fitnes_domains) { fitnes_domains.last(3) }

        describe 'Show' do
          let!(:coach_profile) { create(:coach_profile, user: coach, fitnes_domains: last_3_fitnes_domains) }
          let!(:coach_profile_params) { {include: 'fitnes_domains'} }

          it 'returns 200 OK status' do
            get(api_v1_coach_profile_path(coach_profile.id), headers: headers, params: coach_profile_params)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('fitnes_domains',
                                        'coach_documents',
                                        'documents')).to eq(coach.coach_profile.attributes.except('user_id',
                                                                                                  'documents',
                                                                                                  'coach_documents',
                                                                                                  'rehabilitation',
                                                                                                  'created_at',
                                                                                                  'updated_at'))
            expect(json_response['fitnes_domains']).to match_array(
              coach.coach_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )
          end
        end

        describe 'Update' do
          let!(:coach_profile) { create(:coach_profile, user: coach, fitnes_domains: last_3_fitnes_domains) }
          let(:coach_profile_params) do
            {
              about:                'Changed info',
              social_network_links: {linkedin: 'https://linkedin.com/test'},
              fitnes_domain_ids:    last_3_fitnes_domains.pluck(:id).join(',')
            }
          end

          it 'returns 200 OK status' do
            put(api_v1_coach_profile_path(coach_profile.id), params: coach_profile_params, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response['fitnes_domains']).to match_array(
              coach.coach_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )
          end
        end
      end
    end
  end
end
