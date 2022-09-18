# frozen_string_literal: true

class Api::V1::MeetingsController < AuthenticatedController
  def index
    meetings = find_meetings_grid_query

    render(json: meetings, each_serializer: MeetingsSerializer, status: :ok, include: inclusions_params)
  end

  def create
    meeting = run_command!(Meetings::Create, params_with_current_user)

    render(json: meeting, serializer: MeetingsSerializer, status: :ok, include: inclusions_params)
  end

  def show
    meeting = find_meeting_query

    render(json: meeting, serializer: MeetingsSerializer, status: :ok, include: inclusions_params)
  end

  def update
    meeting = run_command!(Meetings::Update, params_with_current_user.merge(meeting: find_meeting_query))

    render(json: meeting, serializer: MeetingsSerializer, status: :ok)
  end

  protected

  def find_meetings_grid_query
    Meetings::GridQuery.call(params_with_current_user)
  end

  def find_meetings_query
    Meetings::BaseQuery.call(params_with_current_user)
  end

  def find_meeting_query
    @find_meeting_query ||= find_meetings_query.find(params_with_current_user[:id])
  end
end
