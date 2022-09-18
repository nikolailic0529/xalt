# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/report_questions', type: :request do
  describe 'Admin' do
    let(:current_user) { create(:user, :admin) }
    let!(:rating_questions)   { create_list(:report_question, 6) }
    let!(:no_rating_question) { create(:report_question, question_type: 'no_rating') }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      context 'without params' do
        it 'gets all questions' do
          get(api_v1_report_questions_path, headers: headers)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(7)
        end
      end

      context 'with question type = rating param' do
        let(:questions_params) { {question_type: 'rating'} }

        it 'gets rating questions' do
          get(api_v1_report_questions_path, headers: headers, params: questions_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(6)
        end
      end

      context 'with question type = no_rating param' do
        let(:questions_params) { {question_type: 'no_rating'} }

        it 'gets unrating questions' do
          get(api_v1_report_questions_path, headers: headers, params: questions_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(1)
        end
      end

      context 'with wrong question type' do
        let(:questions_params) { {question_type: 'wrong'} }

        it 'gets nothing' do
          get(api_v1_report_questions_path, headers: headers, params: questions_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(0)
        end
      end
    end
  end

  describe 'Member' do
    let(:current_user) { create(:user, :member) }
    let!(:rating_questions)   { create_list(:report_question, 6) }
    let!(:no_rating_question) { create(:report_question, question_type: 'no_rating') }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      context 'without params' do
        it 'gets all questions' do
          get(api_v1_report_questions_path, headers: headers)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(7)
        end
      end

      context 'with question type = rating param' do
        let(:questions_params) { {question_type: 'rating'} }

        it 'gets rating questions' do
          get(api_v1_report_questions_path, headers: headers, params: questions_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(6)
        end
      end

      context 'with question type = no_rating param' do
        let(:questions_params) { {question_type: 'no_rating'} }

        it 'gets unrating questions' do
          get(api_v1_report_questions_path, headers: headers, params: questions_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(1)
        end
      end
    end
  end
end
