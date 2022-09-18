# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/messages', type: :request do
  describe 'Admin' do
    let!(:current_user) { create(:user, :admin) }
    let!(:coach)        { create(:user, :coach) }
    let!(:member)       { create(:user, :member) }
    let!(:conversation) { create(:conversation, users: [coach, member]) }
    let!(:messages)     { create_list(:message, 30, conversation: conversation) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      context 'with valid params' do
        let(:conversations_params) { {conversation_id: messages[0].conversation.id} }

        it 'gets all messages on the first page' do
          get(api_v1_messages_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq Core::Queries::Concerns::PaginatedQuery::DEFAULT_PAGE_SIZE
        end
      end

      context 'without params' do
        it 'gets all messages on the first page' do
          get(api_v1_messages_path, headers: headers)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(25)
        end
      end

      context 'with invalid params' do
        let(:conversations_params) { {conversation_id: 'wrong id'} }

        it 'gets no messages' do
          get(api_v1_messages_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq 0
        end
      end
    end
  end

  describe 'Coach' do
    let!(:current_user) { create(:user, :coach) }
    let!(:member)       { create(:user, :member) }
    let!(:conversation) { create(:conversation, users: [current_user, member]) }
    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      let!(:messages) { create_list(:message, 30, conversation: conversation) }

      context 'with valid params' do
        let(:conversations_params) { {conversation_id: messages[0].conversation.id} }

        it 'gets all messages on the first page' do
          get(api_v1_messages_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq Core::Queries::Concerns::PaginatedQuery::DEFAULT_PAGE_SIZE
        end
      end

      context 'without params' do
        it 'gets no messages' do
          get(api_v1_messages_path, headers: headers)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(25)
        end
      end

      context 'with invalid params' do
        let(:conversations_params) { {conversation_id: 'wrong id'} }

        it 'gets no messages' do
          get(api_v1_messages_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq 0
        end
      end
    end

    describe 'Create' do
      context 'with valid params' do
        let!(:message_params) do
          {
            conversation_id: conversation.id,
            content:         '<br>Ruby is the best! U+1F601<br>'
          }
        end

        it 'gets 200' do
          post(api_v1_messages_path, headers: headers, params: message_params)

          expect(status).to eq 200

          expect(json_response['content']).to eq('Ruby is the best! U+1F601')
          expect(json_response['sender']['id']).to eq(current_user.id)
        end

        it 'creates message' do
          expect { post(api_v1_messages_path, headers: headers, params: message_params) }
            .to change(Message, :count).by(1)
        end
      end

      context 'with invalid params' do
        context 'without conversation_id' do
          let!(:message_params) { {content: 'it should be failed'} }

          it 'gets 422' do
            post(api_v1_messages_path, headers: headers, params: message_params)

            expect(status).to eq 422
          end
        end

        context 'without content' do
          let!(:message_params) { {conversation_id: conversation.id} }

          it 'gets 422' do
            post(api_v1_messages_path, headers: headers, params: message_params)

            expect(status).to eq 422
          end
        end
      end

      context 'without params' do
        it 'gets 422' do
          post(api_v1_messages_path, headers: headers)

          expect(status).to eq 422
        end
      end
    end
  end

  describe 'Member' do
    let!(:current_user) { create(:user, :member) }
    let!(:coach)        { create(:user, :coach) }
    let!(:conversation) { create(:conversation, users: [current_user, coach]) }
    let!(:messages)     { create_list(:message, 30, conversation: conversation) }
    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      context 'with valid params' do
        let(:conversations_params) { {conversation_id: messages[0].conversation.id} }

        it 'gets all messages on the first page' do
          get(api_v1_messages_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq Core::Queries::Concerns::PaginatedQuery::DEFAULT_PAGE_SIZE
        end
      end

      context 'without params' do
        it 'gets no messages' do
          get(api_v1_messages_path, headers: headers)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq(25)
        end
      end

      context 'with invalid params' do
        let(:conversations_params) { {conversation_id: 'wrong id'} }

        it 'gets no messages' do
          get(api_v1_messages_path, headers: headers, params: conversations_params)

          expect(response).to have_http_status(:ok)
          expect(json_response.count).to eq 0
        end
      end
    end

    describe 'Create' do
      context 'with valid params' do
        let!(:message_params) do
          {
            conversation_id: conversation.id,
            content:         'Ruby is the best!'
          }
        end

        it 'gets 200' do
          post(api_v1_messages_path, headers: headers, params: message_params)

          expect(status).to eq 200

          expect(json_response['content']).to eq message_params[:content]
          expect(json_response['sender']['id']).to eq current_user.id
        end

        it 'creates message' do
          expect { post(api_v1_messages_path, headers: headers, params: message_params) }
            .to change(Message, :count).by(1)
        end
      end

      context 'with invalid params' do
        context 'without conversation_id' do
          let!(:message_params) { {content: 'it should be failed'} }

          it 'gets 422' do
            post(api_v1_messages_path, headers: headers, params: message_params)

            expect(status).to eq 422
          end
        end

        context 'without content' do
          let!(:message_params) { {conversation_id: conversation.id} }

          it 'gets 422' do
            post(api_v1_messages_path, headers: headers, params: message_params)

            expect(status).to eq 422
          end
        end
      end

      context 'without params' do
        it 'gets 422' do
          post(api_v1_messages_path, headers: headers)

          expect(status).to eq 422
        end
      end
    end
  end
end
