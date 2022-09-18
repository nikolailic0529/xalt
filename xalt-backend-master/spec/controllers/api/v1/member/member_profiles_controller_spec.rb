# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/member/member_profiles', type: :request do
  describe 'Member' do
    let(:current_user) { create(:user, role: 'member') }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'MemberProfiles CRUD' do
      context 'with valid params' do
        let!(:fitnes_domains) { create_list(:fitnes_domain, 6) }
        let!(:last_3_fitnes_domains) { fitnes_domains.last(3) }
        let!(:subscription) { create(:subscription) }

        describe 'Create' do
          let(:member_profile_params) do
            {
              fitnes_domain_ids:     last_3_fitnes_domains.pluck(:id).join(','),
              subscription_id:       subscription.id,
              hours_spend_last_week: 10
            }
          end

          it 'returns 200 OK status' do
            post(api_v1_member_member_profiles_path, headers: headers, params: member_profile_params)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('fitnes_domains', 'subscription', 'coach_profile', 'user', 'programs',
                                        'reports')).to eq(
                                          current_user.member_profile.attributes.except('user_id', 'created_at',
                                                                                        'updated_at')
                                        )
            expect(json_response['fitnes_domains']).to match_array(
              current_user.member_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )
          end
        end

        describe 'Show' do
          let!(:member_profile) do
            create(:member_profile, user: current_user, fitnes_domains: last_3_fitnes_domains,
                                                        subscription: subscription)
          end
          let(:member_params) { {include: 'subscription,fitnes_domains'} }

          it 'returns 200 OK status' do
            get(api_v1_member_member_profile_path(member_profile.id), headers: headers, params: member_params)

            expect(response).to have_http_status(:ok)

            expect(json_response['subscription']['id']).to eq subscription.id
          end
        end

        describe 'Update' do
          let!(:coach) { create(:user, :coach) }
          let!(:another_coach) { create(:user, :coach) }
          let!(:member_profile) { create(:member_profile, user: current_user) }
          let!(:member_profile_update_params) do
            {
              hours_spend_last_week: 20,
              fitnes_domain_ids:     last_3_fitnes_domains.pluck(:id).join(','),
              subscription_id:       subscription.id,
              coach_profile_id:      coach.coach_profile.id
            }
          end

          it 'returns 200 OK status' do
            put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params,
                                                                      headers: headers)
            member_profile = current_user.member_profile.reload

            expect(response).to have_http_status(:ok)

            expect(json_response.except('fitnes_domains', 'coach_profile', 'user', 'programs', 'reports')).to eq(
              member_profile.attributes.except('user_id', 'created_at', 'updated_at').merge(
                'subscription' => member_profile.subscription
                                                .attributes
                                                .except('created_at', 'updated_at')
                                                .merge('amount' => member_profile.subscription
                                                                                  .attributes
                                                                                  .delete('amount')
                                                                                  .to_s)
              )
            )
            expect(json_response['fitnes_domains']).to match_array(
              member_profile.fitnes_domains.map { |domain|
                domain.attributes.except('created_at', 'updated_at')
              }
            )
          end

          it 'creates conversation' do
            expect {
              put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params,
                                                                        headers: headers)
            }.to change(Conversation, :count).by(1)
          end

          context 'when member and coach have conversation' do
            before { create(:conversation, users: [current_user, coach]) }

            it 'does not create conversation' do
              expect {
                put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params,
                                                                          headers: headers)
              }.to change(Conversation, :count).by(0)
            end

            context 'when coach has more than 1 conversations' do
              before { create(:conversation, users: [create(:user, :member), coach]) }

              it 'does not create conversation' do
                expect {
                  put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params,
                                                                            headers: headers)
                }.to change(Conversation, :count).by(0)
              end
            end
          end

          context 'when coach has conversations but user do not' do
            before { create(:conversation, users: [create(:user, :member), coach]) }

            it 'creates conversation' do
              expect {
                put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params,
                                                                          headers: headers)
              }.to change(Conversation, :count).by(1)
            end
          end

          context 'when member already has the coach' do
            before do
              member_profile.update(coach_profile_id: coach.coach_profile.id)
            end

            let!(:conversation) { create(:conversation, users: [current_user, coach]) }

            context 'when member change the coach' do
              let!(:member_profile_update_params1) do
                {
                  hours_spend_last_week: 40,
                  fitnes_domain_ids:     last_3_fitnes_domains.pluck(:id).join(','),
                  subscription_id:       subscription.id,
                  coach_profile_id:      another_coach.coach_profile.id
                }
              end

              it 'gets 200' do
                put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params1,
                                                                          headers: headers)

                expect(response).to have_http_status(:ok)
              end

              it 'changes coach for member' do
                put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params1,
                                                                          headers: headers)

                member_profile.reload
                expect(json_response['coach_profile_id']).not_to eq coach.coach_profile.id
                expect(json_response['coach_profile_id']).to eq another_coach.coach_profile.id
              end

              it 'creates new conversation' do
                put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params1,
                                                                          headers: headers)

                expect(current_user.conversations.count).to eq 1
                expect(current_user.conversations.with_deleted.count).to eq 2
                expect(current_user.conversations.first.id).not_to eq conversation.id
              end

              it 'deletes old convesation' do
                put(api_v1_member_member_profile_path(member_profile.id), params:  member_profile_update_params1,
                                                                          headers: headers)

                expect(Conversation.find_by(id: conversation.id)).to eq nil
              end
            end
          end
        end
      end
    end

    describe 'when member already has member_profile' do
      let!(:fitnes_domains) { create_list(:fitnes_domain, 6) }
      let!(:last_3_fitnes_domains) { fitnes_domains.last(3) }
      let!(:subscription) { create(:subscription) }
      let!(:member_profile) do
        create(:member_profile, user: current_user, fitnes_domains: last_3_fitnes_domains,
                                                    subscription: subscription)
      end

      describe 'Create' do
        let(:member_profile_params) do
          {
            fitnes_domain_ids:     last_3_fitnes_domains.pluck(:id).join(','),
            subscription_id:       subscription.id,
            hours_spend_last_week: 20
          }
        end

        it 'returns 422 status' do
          post(api_v1_member_member_profiles_path, headers: headers, params: member_profile_params)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(json_response['errors'][0]['detail']).to eq 'Member profile for this user already exists'
        end
      end
    end

    describe 'Coach' do
      let!(:current_user) { create(:user, :coach) }
      let!(:member) { create(:user, :member, coach_profile: current_user.coach_profile) }
      let!(:homework_programs) {
        create_list(:program, 5, :homework, coach_profile:  current_user.coach_profile,
                                            member_profile: member.member_profile)
      }

      let(:headers) do
        auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
      end

      describe 'MemberProfiles CRUD' do
        context 'with valid params' do
          describe 'Show' do
            let(:member_params) { {include: 'programs,coach_profile,subscription'} }

            it 'returns 200 OK status' do
              get(api_v1_member_member_profile_path(member.member_profile.id), headers: headers, params: member_params)

              expect(response).to have_http_status(:ok)
            end
          end
        end
      end
    end
  end
end
