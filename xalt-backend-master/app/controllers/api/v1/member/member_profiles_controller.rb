# frozen_string_literal: true

class Api::V1::Member::MemberProfilesController < AuthenticatedController
  def show
    member_profile = find_member_profile

    render(json: member_profile, serializer: Members::ProfilesSerializer, status: :ok, include: inclusions_params)
  end

  def create
    member_profile = run_command!(Members::Profiles::Create, params_with_current_user.merge(user: current_user))

    render(json: member_profile, serializer: Members::ProfilesSerializer, status: :ok)
  end

  def update
    member_profile = run_command!(Members::Profiles::Update,
                                  params_with_current_user.merge(user: current_user, profile: find_member_profile))

    render(json: member_profile, serializer: Members::ProfilesSerializer, status: :ok)
  end

  def measurements
    member_profile = find_member_profile
    member_profile.update(measurements: params_with_current_user[:measurements])
    render(json: member_profile, serializer: Members::ProfilesSerializer, status: :ok, include: inclusions_params)
  end

  private

  def find_members_profiles_query
    Members::Profiles::BaseQuery.call(params_with_current_user)
  end

  def find_member_profile
    find_members_profiles_query.find(params_with_current_user[:id])
  end
end
