# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/users', type: :request do
  describe 'Admin' do
    let(:current_user) { create(:user, :admin) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'users CRUD' do
      describe 'Index' do
        context 'with out filter params' do
          let!(:members) { create_list(:user, 6, role: 'member') }
          let!(:coaches) { create_list(:user, 3, role: 'coach') }

          it 'fetch users by admin' do
            get(api_v1_users_path, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.count).to eq(10)
            expect(json_response.select { |user| user['role'] == 'member' }.count).to eq(6)
            expect(json_response.select { |user| user['role'] == 'coach' }.count).to eq(3)
            expect(json_response.select { |user| user['role'] == 'admin' }.count).to eq(1)
          end
        end
      end

      describe 'Create' do
        context 'when creating admin user' do
          let(:user_params) {
            {email: 'admin@example.com', password: 'password', name: 'Admin', role: 'admin',
              is_onboarding_finished: 'true'}
          }

          it 'returns 200 OK status' do
            post(api_v1_users_path, headers: headers, params: user_params)
            user = User.find_by(email: 'admin@example.com')

            expect(response).to have_http_status(:ok)
            expect(json_response.except('avatar')).to eq(
              {
                'id'                           => user.id,
                'email'                        => user.email,
                'name'                         => user.name,
                'role'                         => user.role,
                'member_profile'               => nil,
                'coach_profile'                => nil,
                'lesson_count'                 => nil,
                'is_onboarding_finished'       => true,
                'stripe'                       => {},
                'subscription_type'            => nil,
                'terms_and_privacy_confirmed'  => user.terms_and_privacy_confirmed,
                'email_notifications_settings' => user.email_notifications_settings
              }
            )
          end
        end

        context 'when creating coach user' do
          let(:user_params) {
            {email: 'coach@example.com', password: 'password', name: 'Coach', role: 'coach',
              is_onboarding_finished: 'true'}
          }

          it 'returns 200 OK status' do
            post(api_v1_users_path, headers: headers, params: user_params)
            user = User.find_by(email: 'coach@example.com')

            expect(response).to have_http_status(:ok)
            expect(json_response.except('avatar', 'email_notifications_settings')).to eq(
              {
                'id'                          => user.id,
                'email'                       => user.email,
                'name'                        => user.name,
                'role'                        => user.role,
                'member_profile'              => nil,
                'coach_profile'               => nil,
                'lesson_count'                => nil,
                'is_onboarding_finished'      => true,
                'stripe'                      => {},
                'subscription_type'           => nil,
                'terms_and_privacy_confirmed' => user.terms_and_privacy_confirmed
              }
            )
          end
        end

        context 'when creating member user' do
          let(:user_params) {
            {email: 'member@example.com', password: 'password', name: 'Member', role: 'member',
              is_onboarding_finished: 'true'}
          }

          it 'returns 200 OK status' do
            post(api_v1_users_path, headers: headers, params: user_params)
            user = User.find_by(email: 'member@example.com')

            expect(response).to have_http_status(:ok)
            expect(json_response.except('avatar', 'email_notifications_settings')).to eq(
              {
                'id'                          => user.id,
                'email'                       => user.email,
                'name'                        => user.name,
                'role'                        => user.role,
                'member_profile'              => nil,
                'coach_profile'               => nil,
                'lesson_count'                => nil,
                'is_onboarding_finished'      => true,
                'stripe'                      => {},
                'subscription_type'           => nil,
                'terms_and_privacy_confirmed' => user.terms_and_privacy_confirmed
              }
            )
          end
        end

        context 'when email is already taken' do
          let!(:user) { create(:user, role: '', email: 'email@email.com') }

          let(:user_params) {
            {email: 'email@email.com', password: 'password', name: 'Test', role: 'member',
              is_onboarding_finished: 'false'}
          }

          it 'returns 422 status' do
            post(api_v1_users_path, headers: headers, params: user_params)

            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_response['errors'][0]['detail']).to eq('Email has already been taken')
          end
        end
      end

      describe 'Show' do
        context 'when user is admin' do
          let!(:user) { create(:user, role: 'admin') }

          it 'returs 200 ok' do
            get(api_v1_user_path(user.id), headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('avatar')).to eq(
              {
                'id'                           => user.id,
                'email'                        => user.email,
                'name'                         => user.name,
                'role'                         => user.role,
                'member_profile'               => nil,
                'coach_profile'                => nil,
                'lesson_count'                 => nil,
                'is_onboarding_finished'       => false,
                'stripe'                       => {
                  'stripe_card_last4' => user.stripe['stripe_card_last4'],
                  'stripe_id'         => user.stripe['stripe_id']
                },
                'subscription_type'            => nil,
                'terms_and_privacy_confirmed'  => user.terms_and_privacy_confirmed,
                'email_notifications_settings' => user.email_notifications_settings
              }
            )
          end
        end

        context 'when user is coach' do
          let!(:user) { create(:user, :coach) }

          it 'returs 200 ok' do
            get(api_v1_user_path(user.id), headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('avatar', 'email_notifications_settings')).to eq(
              {
                'id'                          => user.id,
                'email'                       => user.email,
                'name'                        => user.name,
                'role'                        => user.role,
                'is_onboarding_finished'      => false,
                'stripe'                      => {'stripe_account_id' => user.stripe['stripe_account_id']},
                'terms_and_privacy_confirmed' => user.terms_and_privacy_confirmed,
                'member_profile'              => nil,
                'lesson_count'                => nil,
                'subscription_type'           => nil,
                'coach_profile'               => {
                  'id'                   => user.coach_profile.id,
                  'about'                => user.coach_profile.about,
                  'social_network_links' => user.coach_profile.social_network_links,
                  'earnings'             => 0.0,
                  'verified'             => false,
                  'xalt_sertified'       => false,
                  'coach_documents'      => user.coach_profile.coach_documents,
                  'coach_intensity'      => user.coach_profile.coach_intensity,
                  'coach_mode'           => user.coach_profile.coach_mode,
                  'coach_styles'         => user.coach_profile.coach_styles,
                  'featured'             => user.coach_profile.featured,
                  'gender'               => user.coach_profile.gender,
                  'loves'                => user.coach_profile.loves,
                  'rate'                 => user.coach_profile.rate,
                  'timezone'             => user.coach_profile.timezone,
                  'training_since'       => user.coach_profile.training_since,
                  'why_with_me_video'    => user.coach_profile.why_with_me_video,
                }
              }
            )
          end
        end

        context 'when user is member' do
          let!(:user) { create(:user, :member) }

          it 'returs 200 ok' do
            get(api_v1_user_path(user.id), headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('avatar', 'email_notifications_settings')).to eq(
              {
                'id'                          => user.id,
                'email'                       => user.email,
                'name'                        => user.name,
                'role'                        => user.role,
                'is_onboarding_finished'      => false,
                'lesson_count'                => nil,
                'stripe'                      => {
                  'stripe_card_last4'    => user.stripe['stripe_card_last4'],
                  'stripe_id'            => user.stripe['stripe_id'],
                  'current_period_start' => user.stripe['current_period_start'],
                  'current_period_end'   => user.stripe['current_period_end']
                },
                'terms_and_privacy_confirmed' => user.terms_and_privacy_confirmed,
                'member_profile'              => {
                  'coach_profile_id'        => user.member_profile.coach_profile_id,
                  'coach_profile'           => nil,
                  'id'                      => user.member_profile.id,
                  'hours_spend_last_week'   => user.member_profile.hours_spend_last_week,
                  'subscription_id'         => user.member_profile.subscription_id,
                  'coach_gender_preference' => user.member_profile.coach_gender_preference,
                  'exercise_places'         => user.member_profile.exercise_places,
                  'ideal_coach'             => user.member_profile.ideal_coach,
                  'measurements'            => user.member_profile.measurements,
                  'intensity_level'         => user.member_profile.intensity_level,
                  'move_per_week_current'   => user.member_profile.move_per_week_current,
                  'move_per_week_plan'      => user.member_profile.move_per_week_plan,
                  'rate_preference'         => user.member_profile.rate_preference,
                  'session_per_week'        => user.member_profile.session_per_week,
                },
                'coach_profile'               => nil,
                'subscription_type'           => nil,
              }
            )
          end
        end
      end

      describe 'Update' do
        context 'when updating by admin' do
          describe 'updating admin user' do
            let!(:user) { create(:user, role: 'member') }
            let(:update_params) { {name: 'Admin', role: 'admin', is_onboarding_finished: 'true'} }

            it 'returs 200 ok' do
              put(api_v1_user_path(user.id), headers: headers, params: update_params)

              user.reload
              expect(response).to have_http_status(:ok)
              expect(json_response.except('avatar')).to eq(
                {
                  'id'                           => user.id,
                  'email'                        => user.email,
                  'name'                         => user.name,
                  'role'                         => user.role,
                  'member_profile'               => nil,
                  'coach_profile'                => nil,
                  'lesson_count'                 => nil,
                  'is_onboarding_finished'       => true,
                  'subscription_type'            => nil,
                  'stripe'                       => {'stripe_card_last4' => '4242', 'stripe_id' => 'cus_123'},
                  'terms_and_privacy_confirmed'  => user.terms_and_privacy_confirmed,
                  'email_notifications_settings' => user.email_notifications_settings
                }
              )
            end
          end
        end
      end
    end
  end

  describe 'Not admin' do
    describe 'Update' do
      context 'when user does not have role' do
        let(:current_user) { create(:user, role: '') }

        let(:headers) do
          auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
        end
        let(:update_params) { {name: 'Updated name', role: 'member', is_onboarding_finished: 'true'} }

        it 'returs 200 ok' do
          put(api_v1_update_current_user_path, headers: headers, params: update_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.except('avatar')).to eq(
            {
              'id'                           => current_user.id,
              'email'                        => current_user.email,
              'name'                         => 'Updated name',
              'role'                         => 'member',
              'member_profile'               => nil,
              'coach_profile'                => nil,
              'lesson_count'                 => nil,
              'is_onboarding_finished'       => true,
              'subscription_type'            => nil,
              'stripe'                       => {'stripe_card_last4' => '4242', 'stripe_id' => 'cus_123'},
              'terms_and_privacy_confirmed'  => current_user.terms_and_privacy_confirmed,
              'email_notifications_settings' => {}
            }
          )
        end

        context 'when user has role' do
          let(:current_user) { create(:user, role: 'member') }

          let(:headers) do
            auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
          end
          let(:update_params) { {name: 'Updated name', role: 'coach', is_onboarding_finished: 'true'} }

          it 'returs 422 unprocessable_entity' do
            put(api_v1_update_current_user_path, headers: headers, params: update_params)

            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_response['errors'])
              .to match(a_collection_including(
                          a_hash_including('detail' => "Role can't be changed")
                        ))
          end
        end

        context 'when user already onboarded' do
          let(:current_user) { create(:user, role: 'member', is_onboarding_finished: true) }

          let(:headers) do
            auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
          end
          let(:update_params) { {name: 'Updated name', is_onboarding_finished: 'false'} }

          it 'returs 422 unprocessable_entity' do
            put(api_v1_update_current_user_path, headers: headers, params: update_params)

            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_response['errors'])
              .to match(a_collection_including(
                          a_hash_including('detail' => "Is onboarding finished can't be changed")
                        ))
          end
        end
      end
    end
  end

  describe 'Coach' do
    describe 'Update current user' do
      context 'when user changes password' do
        let!(:current_user) { create(:user, :coach) }

        let(:headers) do
          auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
        end
        let(:update_params) {
          {old_password: 'password', new_password: 'jetruby123', new_password_confirmation: 'jetruby123'}
        }

        it 'returs 200 ok status' do
          put(api_v1_change_password_path, headers: headers, params: update_params)

          expect(response).to have_http_status(:ok)
        end

        it 'changes password' do
          expect {
            put(api_v1_change_password_path, headers: headers, params: update_params)
            current_user.reload
          }.to change(current_user, :encrypted_password)
        end
      end

      context 'when user enter invalid password confirmation' do
        let!(:current_user) { create(:user, :coach) }

        let(:headers) do
          auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
        end
        let(:update_params) { {old_password: 'password', new_password: 'jet123', new_password_confirmation: 'asd123'} }

        it 'returns 422 status' do
          put(api_v1_change_password_path, headers: headers, params: update_params)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(json_response['errors'][0]['detail']).to eq 'New password and password confirmation should be matched'
        end

        it 'does not change password' do
          expect {
            put(api_v1_change_password_path, headers: headers, params: update_params)
            current_user.reload
          }.not_to change(current_user, :encrypted_password)
        end
      end

      context 'when user enter invalid old password' do
        let!(:current_user) { create(:user, :coach) }

        let(:headers) do
          auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
        end
        let(:update_params) { {old_password: 'pass', new_password: 'jet123', new_password_confirmation: 'jet123'} }

        it 'returns 422 status' do
          put(api_v1_change_password_path, headers: headers, params: update_params)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(json_response['errors'][0]['detail']).to eq 'Old password should be valid'
        end

        it 'does not change password' do
          expect {
            put(api_v1_change_password_path, headers: headers, params: update_params)
            current_user.reload
          }.not_to change(current_user, :encrypted_password)
        end
      end

      context 'when user enter no password confirmation' do
        let!(:current_user) { create(:user, :coach) }

        let(:headers) do
          auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
        end
        let(:update_params) { {old_password: 'password', new_password: 'jet123'} }

        it 'returns 422 status' do
          put(api_v1_change_password_path, headers: headers, params: update_params)

          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'does not change password' do
          expect {
            put(api_v1_change_password_path, headers: headers, params: update_params)
            current_user.reload
          }.not_to change(current_user, :encrypted_password)
        end
      end
    end
  end
end
