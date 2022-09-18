# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/conversations', type: :request do
  describe 'Admin' do
    let(:current_user)   { create(:user, :admin) }
    let!(:conversations) { create_list(:conversation, 30) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      context 'without params' do
        it 'gets all conversations on the first page' do
          get(api_v1_conversations_path, headers: headers)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(25)
        end
      end

      context 'with page param' do
        let(:conversations_params) { {page: 2} }

        it 'gets all conversations on the second page' do
          get(api_v1_conversations_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(5)
        end
      end
    end
  end

  describe 'Coach' do
    let(:current_user)     { create(:user, :coach) }
    let!(:another_coach)   { create(:user, :coach) }
    let!(:members)         { create_list(:user, 10, :member) }
    let!(:another_members) { create_list(:user, 10, :member) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      before do
        members.each { |member| create(:conversation, users: [current_user, member]) }
        another_members.each { |member| create(:conversation, users: [another_coach, member]) }
      end

      context 'without params' do
        it 'gets all current coach conversations' do
          get(api_v1_conversations_path, headers: headers, params: {include: 'users'})

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to be < Conversation.count
          json_response.each do |item|
            coach = item['users'].select { |subitem| subitem['role'] == 'coach' }
            expect(coach[0]['email']).to eq current_user.email
          end
        end
      end
    end
  end

  describe 'Member' do
    let(:current_user)  { create(:user, :member) }
    let!(:coach)        { create(:user, :coach) }
    let!(:conversation) { create(:conversation, users: [current_user, coach]) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      context 'without params' do
        it 'gets all current coach conversations' do
          get(api_v1_conversations_path, headers: headers, params: {include: 'users'})

          expect(response).to have_http_status(:ok)
          json_response.each do |item|
            coach = item['users'].select { |subitem| subitem['role'] == 'member' }
            expect(coach[0]['email']).to eq current_user.email
          end
        end
      end
    end
  end
end
