# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/meetings', type: :request do
  describe 'Coach' do
    let!(:current_user)  { create(:user, :coach, email: 'eggorke@gmail.com') }
    let!(:member)        { create(:user, :member) }
    let!(:another_member) { create(:user, :member) }
    let!(:another_coach) { create(:user, :coach) }
    let!(:session)       {
      create(:program, :session, coach_profile: current_user.coach_profile, member_profile: member.member_profile)
    }
    let!(:rating_questions)   { create_list(:report_question, 6) }
    let!(:no_rating_question) { create(:report_question, question_type: 'no_rating') }
    let!(:subscription) { create(:subscription) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Meetings CRUD' do
      describe 'Create' do
        context 'with valid params' do
          before { member.member_profile.update(coach_profile: current_user.coach_profile, subscription: subscription) }

          let(:meeting_params) do
            {
              coach_profile_id:  current_user.coach_profile.id,
              member_profile_id: member.member_profile.id,
              program_id:        session.id,
              time_from:         Time.zone.now + 1.day,
              time_to:           Time.zone.now + 1.day + 15.minutes
            }
          end

          it 'returns 200 OK status' do
            post(api_v1_meetings_path, headers: headers, params: meeting_params)

            expect(response).to have_http_status(:ok)
            expect(json_response['coach_profile_id']).to eq current_user.coach_profile.id
            expect(json_response['member_profile_id']).to eq member.member_profile.id
            expect(json_response['is_member_confirmed']).to eq false
          end

          it 'creates meeting' do
            expect { post(api_v1_meetings_path, headers: headers, params: meeting_params) }
              .to change(Meeting, :count).by(1)
          end

          context 'when coach and member already have one meeting' do
            let!(:meeting) {
              create(:meeting, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                     program: session)
            }

            it 'creates meeting' do
              expect { post(api_v1_meetings_path, headers: headers, params: meeting_params) }
                .to change(Meeting, :count).by(1)
            end
          end

          context 'when coach and member already have three meetings' do
            let!(:meetings) {
              create_list(:meeting, 3, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                     program: session)
            }

            it 'creates meeting' do
              expect { post(api_v1_meetings_path, headers: headers, params: meeting_params) }
                .to change(Meeting, :count).by(1)
            end
          end

          context 'when coach and member have meetings in last month' do
            let!(:meetings) {
              create_list(:meeting, 3, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                     program: session, time_from: Time.zone.now - 40.days, time_to: Time.zone.now - 40.days + 15.minutes)
            }

            it 'creates meeting' do
              expect { post(api_v1_meetings_path, headers: headers, params: meeting_params) }
                .to change(Meeting, :count).by(1)
            end
          end

          context 'when coach and member have meetings in future month' do
            let!(:meetings) {
              create_list(:meeting, 3, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                     program: session, time_from: Time.zone.now + 40.days, time_to: Time.zone.now + 40.days + 15.minutes)
            }

            it 'creates meeting' do
              expect { post(api_v1_meetings_path, headers: headers, params: meeting_params) }
                .to change(Meeting, :count).by(1)
            end
          end
        end

        context 'with invalid params' do
          let(:meeting_params) do
            {
              coach_profile_id:  current_user.coach_profile.id,
              member_profile_id: member.member_profile.id,
              program_id:        session.id,
              time_from:         Time.zone.now + 1.day,
              time_to:           Time.zone.now + 1.day + 15.minutes
            }
          end

          context 'when member has another coach' do
            before do
              another_member.member_profile.update(coach_profile: current_user.coach_profile)
              member.member_profile.update(coach_profile: another_coach.coach_profile)
              session.update(coach_profile: another_coach.coach_profile)
            end

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to eq('Meeting can not be created with not your member')
            end
          end

          context 'when coach creates meeting in past time' do
            before { meeting_params.update(time_from: Time.zone.now - 15.minutes) }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)
              expected_result = 'Meeting can not be created with not your member, '
              expected_result += 'Meeting can not be created in past time, Meeting should be 15 minutes'

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to eq expected_result
            end
          end

          context 'when coach_profile is missing' do
            before { meeting_params.update(coach_profile_id: nil) }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when member_profile is missing' do
            before { meeting_params.update(member_profile_id: nil) }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when program is missing' do
            before { meeting_params.update(program_id: nil) }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when time_to is missing' do
            before { meeting_params.except!(:time_to) }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when time_from is missing' do
            before { meeting_params.except!(:time_from) }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when member reached meetings limit in this month' do
            before {
              member.member_profile.update(coach_profile: current_user.coach_profile, subscription: subscription)
            }

            let!(:meetings) {
              create_list(:meeting, 4, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
              program: session, time_from: Time.zone.now + 40.minutes, time_to: Time.zone.now + 55.minutes)
            }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail'])
                .to eq('Meeting could not be created due to session limit of this member')
            end
          end

          context 'when member has no subscription' do
            before {
              member.member_profile.update(coach_profile: current_user.coach_profile, subscription: nil)
            }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail'])
                .to eq('Meeting could not be created due to no subscription for this member')
            end
          end

          context 'when member has no stripe data' do
            before {
              member.member_profile.update(coach_profile: current_user.coach_profile, subscription: subscription)
              member.update(stripe: {})
            }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail'])
                .to eq('Meeting could not be created due to expired subscription for this member')
            end
          end

          context 'when member subscription has been expired' do
            before {
              member.member_profile.update(coach_profile: current_user.coach_profile, subscription: subscription)
              member.update(stripe: {current_period_end: (Time.zone.now - 1.day).to_datetime.to_i})
            }

            it 'returns 422 status' do
              post(api_v1_meetings_path, headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail'])
                .to eq('Meeting could not be created due to expired subscription for this member')
            end
          end
        end
      end

      describe 'Update' do
        let!(:meeting) {
          create(:meeting, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                 program: session, time_from: Time.zone.now + 40.minutes, time_to: Time.zone.now + 55.minutes)
        }

        context 'with valid params' do
          let(:meeting_params) do
            {
              time_from: Time.zone.now + 1.day,
              time_to:   Time.zone.now + 1.day + 15.minutes
            }
          end

          it 'returns 200 OK status' do
            put(api_v1_meeting_path(meeting.id), headers: headers, params: meeting_params)

            expect(response).to have_http_status(:ok)
          end

          it 'changes meeting time_from' do
            expect {
              put(api_v1_meeting_path(meeting.id), headers: headers, params: meeting_params)
              meeting.reload
            }.to change(meeting, :time_from)
          end

          it 'changes meeting time_to' do
            expect {
              put(api_v1_meeting_path(meeting.id), headers: headers, params: meeting_params)
              meeting.reload
            }.to change(meeting, :time_to)
          end
        end

        context 'with invalid params' do
          let(:meeting_params) do
            {
              time_from: Time.zone.now + 1.day,
              time_to:   Time.zone.now + 1.day + 15.minutes
            }
          end

          context 'when time_to and time_from in the past' do
            before { meeting_params.update(time_to: Time.zone.now - 30.minutes, time_from: Time.zone.now - 45.minutes) }

            it 'returns 422 status' do
              put(api_v1_meeting_path(meeting.id), headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when changing time to less than 15 minutes before meeting' do
            before do
              meeting.update(time_from: Time.zone.now + 13.minutes, time_to: Time.zone.now + 28.minutes)
              meeting_params.update(time_to: meeting.time_from + 75.minutes, time_from: meeting.time_from + 60.minutes)
            end

            it 'returns 422 status' do
              put(api_v1_meeting_path(meeting.id), headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail'])
                .to eq 'Meeting date could not be changed 15 minutes before the meeting'
            end
          end

          context 'when coach is changing member confirmation' do
            before { meeting_params.update(is_member_confirmed: true) }

            it 'returns 422 status' do
              put(api_v1_meeting_path(meeting.id), headers: headers, params: meeting_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end
        end
      end

      describe 'Show' do
        let!(:meeting) {
          create(:meeting, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                 program: session)
        }
        let!(:another_program) { create(:program, :session) }
        let!(:another_meeting) {
          create(:meeting, coach_profile: another_program.coach_profile, member_profile: another_program.member_profile)
        }

        context 'with valid params' do
          it 'returns 200 OK status' do
            get(api_v1_meeting_path(meeting.id), headers: headers)

            expect(response).to have_http_status(:ok)
          end

          it 'gets meeting' do
            get(api_v1_meeting_path(meeting.id), headers: headers)

            expect(json_response['id']).to eq meeting.id
            expect(json_response['coach_profile_id']).to eq meeting.coach_profile_id
            expect(json_response['member_profile_id']).to eq meeting.member_profile_id
          end
        end

        context 'with invalid params' do
          it 'raises the error' do
            expect { get(api_v1_meeting_path(another_meeting.id), headers: headers) }
              .to raise_exception(ActiveRecord::RecordNotFound)
          end
        end
      end

      describe 'Index' do
        let!(:meeting) {
          create(:meeting, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                 program: session, time_from: Time.zone.now - 5.hours, time_to: Time.zone.now - 5.hours - 15.minutes)
        }
        let!(:meeting2) {
          create(:meeting, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                 program: session, time_from: Time.zone.now + 10.days, time_to: Time.zone.now + 10.days + 15.minutes)
        }
        let!(:meeting3) {
          create(:meeting, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                 program: session, time_from: Time.zone.now + 45.days, time_to: Time.zone.now + 45.days + 15.minutes)
        }

        let!(:another_program) { create(:program, :session) }
        let!(:another_meeting) {
          create(:meeting, coach_profile: another_program.coach_profile, member_profile: another_program.member_profile)
        }

        context 'with valid params' do
          let!(:meetings_params) do
            {
              time_from:   Time.zone.now,
              time_to:     Time.zone.now + 15.days,
              include:     'coach_profile.user,member_profile.user,program',
              sort:        'time_from',
              is_finished: false
            }
          end

          it 'returns 200 OK status' do
            get(api_v1_meetings_path, params: meetings_params, headers: headers)

            expect(response).to have_http_status(:ok)
          end

          it 'gets only 1 meeting' do
            get(api_v1_meetings_path, params: meetings_params, headers: headers)

            expect(json_response.count).to eq 1
          end

          context 'when time_from is changed' do
            before { meetings_params.update(time_from: Time.zone.now - 1.day) }

            it 'gets 2 meetings' do
              get(api_v1_meetings_path, params: meetings_params, headers: headers)

              expect(json_response.count).to eq 2
            end
          end

          context 'when time filter is changed' do
            before { meetings_params.update(time_from: Time.zone.now - 1.day, time_to: Time.zone.now + 50.days) }

            it 'gets 3 meetings' do
              get(api_v1_meetings_path, params: meetings_params, headers: headers)

              expect(json_response.count).to eq 3
            end
          end

          context 'when query parameter is_finished = true' do
            before { meetings_params.update(is_finished: true) }

            it 'gets 0 meetings' do
              get(api_v1_meetings_path, params: meetings_params, headers: headers)

              expect(json_response.count).to eq 0
            end
          end
        end

        context 'when coach has 23 meetings' do
          let!(:meetings) {
            create_list(:meeting, 20, coach_profile: current_user.coach_profile, member_profile: member.member_profile,
                   program: session, time_from: Time.zone.now, time_to: Time.zone.now + 15.minutes)
          }

          context 'when meetings time_from is different time' do
            before do
              (0..19).each do |i|
                meetings[i].update(time_from: Time.zone.now + i.hours, time_to: Time.zone.now + i.hours + 15.minutes)
              end
              meeting.update(time_from: Time.zone.now - 1.day, time_to: Time.zone.now - 1.day + 15.minutes)
              meeting2.update(time_from: Time.zone.now - 2.days, time_to: Time.zone.now - 2.days + 15.minutes)
              meeting3.update(time_from: Time.zone.now - 3.days, time_to: Time.zone.now - 3.days + 15.minutes)
            end

            let!(:meetings_params1) do
              {
                sort: 'time_from'
              }
            end

            it 'gets sorted meetings by time_from field' do
              get(api_v1_meetings_path, params: meetings_params1, headers: headers)

              expect(json_response.count).to eq 23
              dates = json_response.pluck('time_from')
              expect(dates).to eq dates.sort
            end

            context 'when request contains no parameters' do
              it 'gets meetings without sorting' do
                get(api_v1_meetings_path, headers: headers)

                expect(json_response.count).to eq 23
                dates = json_response.pluck('time_from')
                expect(dates).not_to eq dates.sort || dates.reverse_sort
              end
            end
          end
        end

        context 'without params' do
          it 'returns 200 OK status' do
            get(api_v1_meetings_path, headers: headers)

            expect(response).to have_http_status(:ok)
          end

          it 'returns all coach meetings' do
            get(api_v1_meetings_path, headers: headers)

            expect(json_response.count).to eq 3
          end
        end

        context 'when include reports' do
          let!(:meetings) {
            create_list(:meeting, 5, coach_profile: current_user.coach_profile,
            member_profile: member.member_profile,
            program: session, is_finished: true)
          }

          let!(:meetings1) {
            create_list(:meeting, 10, coach_profile: current_user.coach_profile,
            member_profile: another_member.member_profile,
            program: session, is_finished: true)
          }

          let!(:reports) {
            create_list(:report, 5, coach_profile: current_user.coach_profile, is_filled: true,
            member_profile: member.member_profile,
            questions: rating_questions, created_at: Time.zone.now, meeting: meetings[0]) { |r, i|
              r.update(
                meeting: meetings[i], created_at: r.created_at + i.days
              )
            }
          }

          let!(:reports1) {
            create_list(:report, 10, coach_profile: current_user.coach_profile, is_filled: true,
            member_profile: another_member.member_profile,
            questions: rating_questions, created_at: Time.zone.now, meeting: meetings1[0]) { |r, i|
              r.update(
                meeting: meetings1[i], created_at: r.created_at + i.days
              )
            }
          }

          it 'gets meetings with reports' do
            get(api_v1_meetings_path, headers: headers)

            expect(json_response.count).to eq 18
            expect(json_response.pluck(:report).count).to eq 18
          end
        end
      end
    end
  end
end
