# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/coach/reports', type: :request do
  describe 'Coach' do
    let(:current_user)        { create(:user, :coach) }
    let(:another_user)        { create(:user, :member) }
    let!(:rating_questions)   { create_list(:report_question, 6) }
    let!(:no_rating_question) { create(:report_question, question_type: 'no_rating') }
    let!(:session_program) {
      create(:program, :session, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile)
    }
    let!(:session_program1) {
      create(:program, :session, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile)
    }
    let!(:meeting) {
      create(:meeting, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
     program: session_program)
    }
    let!(:meeting1) {
      create(:meeting, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
     program: session_program1)
    }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Reports CRUD' do
      before { another_user.member_profile.update(coach_profile: current_user.coach_profile) }

      describe 'Create' do
        context 'with valid params' do
          let(:report_params) do
            {
              coach_profile_id:    current_user.coach_profile.id,
              member_profile_id:   another_user.member_profile.id,
              summary:             'Super',
              additional_comments: 'awesome',
              meeting_id:          meeting.id
            }
          end

          it 'returns 401 status' do
            post(api_v1_coach_reports_path, headers: headers, params: report_params)

            expect(response).to have_http_status(:unauthorized)
          end
        end

        context 'when report for meeting already exists' do
          let!(:report) {
            create(:report, meeting: meeting, coach_profile: current_user.coach_profile,
           member_profile: another_user.member_profile)
          }
          let(:report_params) do
            {
              coach_profile_id:    current_user.coach_profile.id,
              member_profile_id:   another_user.member_profile.id,
              summary:             'Super',
              additional_comments: 'awesome',
              meeting_id:          meeting.id
            }
          end

          it 'returns 401 status' do
            post(api_v1_coach_reports_path, headers: headers, params: report_params)

            expect(response).to have_http_status(:unauthorized)
          end
        end
      end

      describe 'Show' do
        context 'with valid params' do
          let!(:report) {
            create(:report, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
           questions: rating_questions, meeting: meeting)
          }
          let!(:rating_answers) {
            rating_questions.each { |q|
              create(:report_answer, :rating, report: report, report_question: q)
            }
          }
          let!(:no_rating_answer) {
            create(:report_answer, :no_rating, report: report, report_question: no_rating_question)
          }

          let!(:report1) {
            create(:report, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
           questions: rating_questions, meeting: meeting1)
          }
          let!(:rating_answers1) {
            rating_questions.each { |q|
              create(:report_answer, :rating, report: report1, report_question: q)
            }
          }
          let!(:no_rating_answer1) {
            create(:report_answer, :no_rating, report: report1, report_question: no_rating_question)
          }

          let!(:params) { {include: 'report_answers,questions'} }

          it 'returns 200 OK status' do
            get(api_v1_coach_report_path(report.id), headers: headers, params: params)

            expect(response).to have_http_status(:ok)
            expect(json_response['id']).to match(report.id)
          end
        end
      end

      describe 'Index' do
        context 'with valid params' do
          let!(:report) {
            create(:report, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
           questions: rating_questions, created_at: Time.zone.now - 1.hour, meeting: meeting)
          }
          let!(:rating_answers) {
            rating_questions.each { |q|
              create(:report_answer, :rating, report: report, report_question: q)
            }
          }
          let!(:no_rating_answer) {
            create(:report_answer, :no_rating, report: report, report_question: no_rating_question)
          }

          let!(:report1) {
            create(:report, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
           questions: rating_questions, created_at: Time.zone.now + 1.hour, meeting: meeting1)
          }
          let!(:rating_answers1) {
            rating_questions.each { |q|
              create(:report_answer, :rating, report: report1, report_question: q)
            }
          }
          let!(:no_rating_answer1) {
            create(:report_answer, :no_rating, report: report1, report_question: no_rating_question)
          }

          let!(:params) {
            {
              include:   'report_answers.report_question',
              is_filled: 'false',
              sort:      'created_at',
              member_id: another_user.id
            }
          }

          it 'returns 200 OK status' do
            get(api_v1_coach_reports_path, headers: headers, params: params)

            expect(response).to have_http_status(:ok)
            expect(json_response.size).to eq(2)
          end
        end
      end

      describe 'Update' do
        let!(:report) {
          create(:report, coach_profile: current_user.coach_profile, member_profile: another_user.member_profile,
         questions: (rating_questions + [no_rating_question]), meeting: meeting)
        }
        let!(:rating_answers) {
          rating_questions.each { |q|
            create(:report_answer, :rating, report: report, report_question: q)
          }
        }
        let!(:no_rating_answer) {
          create(:report_answer, :no_rating, report: report, report_question: no_rating_question)
        }

        context 'with valid params' do
          let(:report_params) do
            {
              summary:             'changed' * 100,
              additional_comments: 'another comment',
              answers:             "[{\"report_question_id\": \"#{rating_questions[0].id}\", \"score\": \"9\"},
                                    {\"report_question_id\": \"#{rating_questions[1].id}\", \"score\": \"9\"},
                                    {\"report_question_id\": \"#{rating_questions[2].id}\", \"score\": \"9\"},
                                    {\"report_question_id\": \"#{rating_questions[3].id}\", \"score\": \"9\"},
                                    {\"report_question_id\": \"#{rating_questions[4].id}\", \"score\": \"9\"},
                                    {\"report_question_id\": \"#{rating_questions[5].id}\", \"score\": \"9\"},
                                    {\"report_question_id\": \"#{no_rating_question.id}\", \"answer\": \"some_of_it\"}]"
            }
          end

          it 'returns 200 OK status' do
            put(api_v1_coach_report_path(report.id), params: report_params, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response['summary']).to eq report_params[:summary]
            expect(json_response['additional_comments']).to eq report_params[:additional_comments]
            answer = json_response['report_answers'].find { |item|
              item['report_question_id'] == rating_questions.first.id
            }
            expect(answer['score']).to eq 9
            expect(json_response['is_filled']).to eq true
          end

          context 'when params contains only summary and additional comment' do
            let(:report_params1) do
              {
                summary:             'changed',
                additional_comments: 'another comment'
              }
            end

            it 'gets unfilled report' do
              put(api_v1_coach_report_path(report.id), params: report_params1, headers: headers)

              expect(response).to have_http_status(:ok)
              expect(json_response['summary']).to eq report_params1[:summary]
              expect(json_response['additional_comments']).to eq report_params1[:additional_comments]
              expect(json_response['is_filled']).to eq false
            end
          end
        end

        context 'with invalid params' do
          context 'when negative score' do
            let(:report_params) do
              {
                summary:             'changed',
                additional_comments: 'another comment',
                answers:             "[{\"report_question_id\": \"#{rating_questions[0].id}\", \"score\": \"-9\"},
                                      {\"report_question_id\": \"#{rating_questions[1].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[2].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[3].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[4].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[5].id}\", \"score\": \"9\"},
                                  {\"report_question_id\": \"#{no_rating_question.id}\", \"answer\": \"some_of_it\"}]"
              }
            end

            it 'returns 422 status' do
              put(api_v1_coach_report_path(report.id), params: report_params, headers: headers)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to eq('Answers rating must be from one to ten')
            end
          end

          context 'when summary > 1000 symbols' do
            let(:report_params) do
              {
                summary:             'changed' * 1500,
                additional_comments: 'another comment',
                answers:             "[{\"report_question_id\": \"#{rating_questions[0].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[1].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[2].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[3].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[4].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[5].id}\", \"score\": \"9\"},
                          {\"report_question_id\": \"#{no_rating_question.id}\", \"answer\": \"some_of_it\"}]"
              }
            end

            it 'returns 422 status' do
              put(api_v1_coach_report_path(report.id), params: report_params, headers: headers)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when score > 10' do
            let(:report_params) do
              {
                summary:             'changed',
                additional_comments: 'another comment',
                answers:             "[{\"report_question_id\": \"#{rating_questions[0].id}\", \"score\": \"11\"},
                                      {\"report_question_id\": \"#{rating_questions[1].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[2].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[3].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[4].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[5].id}\", \"score\": \"9\"},
                          {\"report_question_id\": \"#{no_rating_question.id}\", \"answer\": \"some_of_it\"}]"
              }
            end

            it 'returns 422 status' do
              put(api_v1_coach_report_path(report.id), params: report_params, headers: headers)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to eq('Answers rating must be from one to ten')
            end
          end

          context 'when score = 0' do
            let(:report_params) do
              {
                summary:             'changed',
                additional_comments: 'another comment',
                answers:             "[{\"report_question_id\": \"#{rating_questions[0].id}\", \"score\": \"0\"},
                                      {\"report_question_id\": \"#{rating_questions[1].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[2].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[3].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[4].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[5].id}\", \"score\": \"9\"},
                          {\"report_question_id\": \"#{no_rating_question.id}\", \"answer\": \"some_of_it\"}]"
              }
            end

            it 'returns 422 status' do
              put(api_v1_coach_report_path(report.id), params: report_params, headers: headers)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to eq('Answers rating must be from one to ten')
            end
          end

          context 'when wrong answer' do
            let(:report_params) do
              {
                summary:             'changed',
                additional_comments: 'another comment',
                answers:             "[{\"report_question_id\": \"#{rating_questions[0].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[1].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[2].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[3].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[4].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{rating_questions[5].id}\", \"score\": \"9\"},
                                      {\"report_question_id\": \"#{no_rating_question.id}\", \"answer\": \"wrong\"}]"
              }
            end

            it 'returns 422 status' do
              put(api_v1_coach_report_path(report.id), params: report_params, headers: headers)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to eq("Answers unrating must be 'yes', 'no', 'some of it'")
            end
          end
        end
      end
    end
  end
end
