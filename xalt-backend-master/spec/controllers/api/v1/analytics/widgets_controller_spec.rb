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
        context 'when members_count_by_coach' do
          let!(:widgets_params) { {widget_names: 'members_count_by_coach'} }

          it 'return 200 OK status' do
            get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

            expect(response).to have_http_status(:ok)
            expect(json_response['members_count_by_coach'][0]['id']).to eq current_user.id
            expect(json_response['members_count_by_coach'][0]['value']).to eq members.count
          end
        end

        context 'when income_in_last_month' do
          let!(:widgets_params) { {widget_names: 'income_in_last_month'} }
          let!(:billing_record) {
            create_list(:billing_record, 10, coach_profile: current_user.coach_profile,
                                             created_at:    Time.zone.now - 1.month)
          }

          it 'return 200 OK status' do
            get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

            expect(json_response['income_in_last_month'][0]['id']).to eq current_user.id
            expect(json_response['income_in_last_month'][0]['value']).to eq '100.0'
          end
        end

        context 'with income_in_last_month when records in this month' do
          let!(:widgets_params) { {widget_names: 'income_in_last_month'} }
          let!(:billing_record) {
            create_list(:billing_record, 10, coach_profile: current_user.coach_profile,
                                             created_at:    Time.zone.now)
          }

          it 'return 200 OK status' do
            get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

            expect(json_response['income_in_last_month']).to eq []
          end
        end

        context 'when condition assessment by member' do
          let!(:rating_questions) { create_list(:report_question, 6) }
          let!(:session_program) {
            create(:program, :session, coach_profile:  current_user.coach_profile,
                                       member_profile: members[0].member_profile)
          }
          let!(:meetings) {
            create_list(:meeting, 20, coach_profile: current_user.coach_profile,
            member_profile: members[0].member_profile,
            program: session_program, is_finished: true)
          }

          let!(:reports) {
            create_list(:report, 20, coach_profile: current_user.coach_profile,
            member_profile: members[0].member_profile,
            questions: rating_questions, created_at: Time.zone.now, meeting: meetings[0]) { |r, i|
              r.update(
                meeting: meetings[i], created_at: r.created_at + i.days
              )
            }
          }

          let!(:rating_answers) {
            reports.each { |r|
              rating_questions.each { |q|
                create(:report_answer, :rating, report: r, report_question: q, created_at: r.created_at)
              }
            }
          }

          context 'with valid params' do
            before do
              (0..19).each do |i|
                meetings[i].update(report_id: reports[i].id)
              end
            end

            let(:param1) { "sessions_limit.8,member_profile_id.#{members[0].member_profile.id}," }
            let(:param2) { "report_question_id.#{rating_questions[0].id}" }
            let!(:widgets_params) {
              {widget_names: 'condition_assessment_by_member',
               filters:      param1 + param2}
            }

            it 'return 200 OK status' do
              get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

              expect(response).to have_http_status(:ok)
            end

            it 'returns 8 items' do
              get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

              expect(json_response['condition_assessment_by_member'].count).to eq 8
              dates = json_response['condition_assessment_by_member'].pluck('date')
              expect(dates).to eq dates.sort
            end

            context 'when sessions limit is 12' do
              let(:param1) { "sessions_limit.12,member_profile_id.#{members[0].member_profile.id}," }
              let(:param2) { "report_question_id.#{rating_questions[0].id}" }

              before {
                widgets_params.update(filters: param1 + param2)
              }

              it 'return 200 OK status' do
                get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

                expect(response).to have_http_status(:ok)
              end

              it 'returns 12 items' do
                get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

                expect(json_response['condition_assessment_by_member'].count).to eq 12
                dates = json_response['condition_assessment_by_member'].pluck('date')
                expect(dates).to eq dates.sort
              end
            end
          end

          context 'with invalid params' do
            before do
              (0..19).each do |i|
                meetings[i].update(report_id: reports[i].id)
              end
            end

            context 'when trying to see member without meetings' do
              let(:param1) { "sessions_limit.8,member_profile_id.#{members[1].member_profile.id}," }
              let(:param2) { "report_question_id.#{rating_questions[0].id}" }
              let!(:widgets_params) {
                {widget_names: 'condition_assessment_by_member',
                 filters:      param1 + param2}
              }

              it 'returns 0 items' do
                get(api_v1_analytics_widgets_path, headers: headers, params: widgets_params)

                expect(json_response['condition_assessment_by_member'].count).to eq 0
              end
            end
          end
        end
      end
    end
  end
end
