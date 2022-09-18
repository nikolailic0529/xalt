# frozen_string_literal: true

class Api::V1::MemberChallengesController < AuthenticatedController
  def index
    member_challenges = case params_with_current_user[:type]
                        when 'my' then find_challenges_grid_query
                        when 'top' then MemberChallenge.top
                        when 'enrolled' then MemberChallenge.enrolled(params_with_current_user['current_user'].id)
                        when 'search' then MemberChallenge.search(params_with_current_user['search_word'])
                        end

    render(json: member_challenges, each_serializer: MemberChallengeSerializer, status: :ok,
           include: inclusions_params)
  end

  def show
    member_challenge = find_challenge_query

    render(json: member_challenge, serializer: MemberChallengeSerializer, status: :ok)
  end

  def create
    member_challenge = run_command!(MemberChallenges::Create, params_with_current_user)

    render(json: member_challenge, serializer: MemberChallengeSerializer, status: :ok)
  end

  def update
    member_challenge = run_command!(MemberChallenges::Update,
                                    params_with_current_user.merge(member_challenge: find_challenge_query))

    render(json: member_challenge, serializer: MemberChallengeSerializer, status: :ok)
  end

  def destroy
    run_command!(MemberChallenges::Delete, params_with_current_user.merge(member_challenge: find_challenge_query))

    render(json: {}, status: :ok)
  end

  protected

  def find_challenges_grid_query
    MemberChallenges::GridQuery.call(params_with_current_user)
  end

  def find_challenges_query
    MemberChallenges::BaseQuery.call(params_with_current_user)
  end

  def find_challenge_query
    @find_challenge_query ||= find_challenges_query.find(params_with_current_user[:id])
  end
end
