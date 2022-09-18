# frozen_string_literal: true

class Api::V1::NotificationsController < AuthenticatedController
  def index
    notifications = find_meetings_grid_query

    render(json: notifications, each_serializer: NotificationsSerializer, status: :ok)
  end

  def update
    updated_notification = run_command!(Notifications::Update,
                                        params_with_current_user.merge(notification: find_notification_query))

    render(json: updated_notification, serializer: NotificationsSerializer, status: :ok)
  end

  def destroy
    run_command!(Notifications::Delete, params_with_current_user.merge(notification: find_notification_query))

    render(json: {}, status: :ok)
  end

  def bulk_destroy
    run_command!(Notifications::BulkDelete, params_with_current_user)

    render(json: {}, status: :ok)
  end

  protected

  def find_meetings_grid_query
    Notifications::GridQuery.call(params_with_current_user)
  end

  def find_notifications_query
    Notifications::BaseQuery.call(params_with_current_user)
  end

  def find_notification_query
    @find_notification_query ||= find_notifications_query.find(params_with_current_user[:id])
  end
end
