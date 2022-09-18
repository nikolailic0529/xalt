# frozen_string_literal: true

class Api::V1::CoachProfilesController < AuthenticatedController
  def show
    coach_profile = find_coach_profile

    render(json: coach_profile, serializer: Coaches::ProfilesSerializer, status: :ok, include: inclusions_params)
  end

  def create
    coach_profile = run_command!(Coaches::Profiles::Create, params_with_current_user.merge(user: current_user))

    render(json: coach_profile, serializer: Coaches::ProfilesSerializer, status: :ok)
  end

  def update
    coach_profile = run_command!(Coaches::Profiles::Update,
                                 params_with_current_user.merge(user:    current_user,
                                                                profile: find_coach_profile))

    render(json: coach_profile, serializer: Coaches::ProfilesSerializer, status: :ok)
  end

  protected

  def find_coaches_profiles_query
    Coaches::Profiles::BaseQuery.call(params_with_current_user)
  end

  def find_coach_profile
    @find_coach_profile ||= find_coaches_profiles_query.find(params_with_current_user[:id])
  end
end
