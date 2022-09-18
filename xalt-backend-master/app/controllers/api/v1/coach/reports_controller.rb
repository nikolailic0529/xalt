# frozen_string_literal: true

class Api::V1::Coach::ReportsController < Api::V1::Coach::BaseCoachController
  def index
    reports = find_reports_grid_query

    render(json: reports, each_serializer: Coaches::ReportSerializer, status: :ok, include: inclusions_params)
  end

  def show
    report = find_report

    render(json: report, serializer: Coaches::ReportSerializer, status: :ok, include: inclusions_params)
  end

  def create
    report =
      run_command!(Coaches::Reports::Create,
                   params_with_current_user.merge(member_profile: find_member_profile,
                                                  coach_profile: find_coach_profile, questions: find_questions_query,
                                                  meeting: find_meeting_query))

    render(json: report, serializer: Coaches::ReportSerializer, status: :ok)
  end

  def update
    report = run_command!(Coaches::Reports::Update, params_with_current_user.merge(report: find_report))

    render(json: report, serializer: Coaches::ReportSerializer, status: :ok)
  end

  protected

  def find_coach_profile
    Coaches::Profiles::BaseQuery.call(params_with_current_user).find(params[:coach_profile_id])
  end

  def find_member_profile
    Members::Profiles::BaseQuery.call(params_with_current_user).find(params[:member_profile_id])
  end

  def find_reports_grid_query
    Reports::GridQuery.call(params_with_current_user)
  end

  def find_reports_query
    Reports::BaseQuery.call(params_with_current_user)
  end

  def find_questions_query
    Questions::BaseQuery.call(params_with_current_user)
  end

  def find_meeting_query
    Meetings::BaseQuery.call(params_with_current_user).find(params[:meeting_id])
  end

  def find_report
    @find_report ||= find_reports_query.find(params_with_current_user[:id])
  end
end
