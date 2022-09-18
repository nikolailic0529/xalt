# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/notifications', type: :request do
  describe 'Coach' do
    let!(:current_user)   { create(:user, :coach) }
    let!(:member)         { create(:user, :member) }
    let!(:notifications1) { create_list(:notification, 10, :new_member, user: current_user) }
    let!(:notifications2) { create_list(:notification, 15, :completed_homework, user: current_user) }
    let!(:notifications3) { create_list(:notification, 20, :new_homework, user: member) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      it 'gets all current user notifications' do
        get(api_v1_notifications_path, headers: headers)

        expect(response).to have_http_status(:ok)
        expect(json_response.count).to eq(notifications1.count + notifications2.count)
        expect(json_response[0]['additional_info']['member_profile_id']).to eq '111'
      end
    end

    describe 'Bulk_destroy' do
      it 'delete all notifications' do
        expect {
          delete(bulk_destroy_api_v1_notifications_path, headers: headers)
        }.to change(Notification, :count).by(-25)
      end
    end

    describe 'Update' do
      context 'with valid params' do
        let!(:notification_params) { {mark_as_read: true} }

        it 'mark notification that it have been read' do
          put(api_v1_notification_path(notifications1[0].id), headers: headers, params: notification_params)

          expect(response).to have_http_status(:ok)
          expect(json_response['mark_as_read']).to eq true
        end
      end

      context 'with invalid params' do
        let!(:notification_params) { {mark_as_read: false} }

        it 'gets 422' do
          put(api_v1_notification_path(notifications1[0].id), headers: headers, params: notification_params)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "with other user's notification" do
        let!(:notification_params) { {mark_as_read: true} }

        it 'raises exception' do
          expect { put(api_v1_notification_path(notifications3[0].id), headers: headers, params: notification_params) }
            .to raise_exception(ActiveRecord::RecordNotFound)
        end
      end
    end

    describe 'Destroy' do
      context 'with valid params' do
        it 'gets 200 OK status' do
          delete(api_v1_notification_path(notifications1[0].id), headers: headers)

          expect(response).to have_http_status(:ok)
        end

        it 'deletes notification' do
          expect { delete(api_v1_notification_path(notifications1[0].id), headers: headers) }
            .to change(Notification, :count).by(-1)
        end
      end

      context 'with not own notification' do
        it 'raises exception' do
          expect { delete(api_v1_notification_path(notifications3[0].id), headers: headers) }
            .to raise_exception(ActiveRecord::RecordNotFound)
        end
      end
    end
  end

  describe 'Member' do
    let!(:current_user) { create(:user, :member) }
    let!(:coach) { create(:user, :coach) }
    let!(:notifications1) { create_list(:notification, 10, :new_member, user: coach) }
    let!(:notifications2) { create_list(:notification, 15, :completed_homework, user: coach) }
    let!(:notifications3) { create_list(:notification, 20, :new_homework, user: current_user) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Index' do
      it 'gets all current user notifications' do
        get(api_v1_notifications_path, headers: headers)

        expect(response).to have_http_status(:ok)
        expect(json_response.count).to eq(notifications3.count)
      end
    end

    describe 'Update' do
      context 'with valid params' do
        let!(:notification_params) { {mark_as_read: true} }

        it 'mark notification that it have been read' do
          put(api_v1_notification_path(notifications3[0].id), headers: headers, params: notification_params)

          expect(response).to have_http_status(:ok)
          expect(json_response['mark_as_read']).to eq true
        end
      end

      context 'with invalid params' do
        let!(:notification_params) { {mark_as_read: false} }

        it 'gets 422' do
          put(api_v1_notification_path(notifications3[0].id), headers: headers, params: notification_params)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "with other user's notification" do
        let!(:notification_params) { {mark_as_read: true} }

        it 'raises exception' do
          expect { put(api_v1_notification_path(notifications1[0].id), headers: headers, params: notification_params) }
            .to raise_exception(ActiveRecord::RecordNotFound)
        end
      end
    end

    describe 'Destroy' do
      context 'with valid params' do
        it 'gets 200 OK status' do
          delete(api_v1_notification_path(notifications3[0].id), headers: headers)

          expect(response).to have_http_status(:ok)
        end

        it 'deletes notification' do
          expect { delete(api_v1_notification_path(notifications3[0].id), headers: headers) }
            .to change(Notification, :count).by(-1)
        end
      end

      context 'with not own notification' do
        it 'raises exception' do
          expect { delete(api_v1_notification_path(notifications1[0].id), headers: headers) }
            .to raise_exception(ActiveRecord::RecordNotFound)
        end
      end
    end

    describe 'Bulk Delete' do
      let!(:notifications) { create_list(:notification, 15, :completed_homework, user: current_user) }

      it 'deletes notification' do
        expect {
          delete(bulk_destroy_api_v1_notifications_path, headers: headers)
        }.to change(Notification, :count).by(-35)
      end
    end
  end
end
