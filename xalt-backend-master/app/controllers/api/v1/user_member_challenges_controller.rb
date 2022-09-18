# frozen_string_literal: true

class Api::V1::UserMemberChallengesController < AuthenticatedController
  before_action :set_user_member_challenge, only: %i[show update destroy]

  def index
    user_member_challenges = UserMemberChallenge.filter_by_user(params[:user_id])

    render(json: user_member_challenges, each_serializer: UserMemberChallengesSerializer, status: :ok,
           include: 'member_challenge')
  end

  def show
    render json: @user_member_challenge
  end

  def create
    # create endpoint may sometimes be called if a user has unenrolled
    # and then re-enrolled into a challenge
    @user_member_challenge = find_member_challenge
    if @user_member_challenge
      @user_member_challenge.update(user_member_challenge_params)
      return render json: @user_member_challenge, serializer: UserMemberChallengesSerializer, status: :ok
    end

    @user_member_challenge = UserMemberChallenge.new(user_member_challenge_params)
    if @user_member_challenge.save
      render json: @user_member_challenge, serializer: UserMemberChallengesSerializer, status: :created
    else
      render json: @user_member_challenge.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user_member_challenge.update(user_member_challenge_params)
      render json: @user_member_challenge, serializer: UserMemberChallengesSerializer, status: :ok
    else
      render json: @user_member_challenge.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user_member_challenge.destroy
    render json: {}, status: :ok
  end

  private

  def find_enrolled_query
    # byebug
    UserMemberChallenges::UserIdFilter.call(params_with_current_user)
  end

  def set_user_member_challenge
    @user_member_challenge = UserMemberChallenge.find(params[:id])
  rescue StandardError
    # if can't find by id, try using the body
    # end user will never have the id of the member challenge
    # They will only have their ID and the challenge id
    @user_member_challenge = find_member_challenge
  end

  def user_member_challenge_params
    params.require(:user_member_challenge).permit(:user_id, :member_challenge_id, :status)
  end

  def find_member_challenge
    UserMemberChallenge.find_by(
      user_id:             params[:user_member_challenge][:user_id],
      member_challenge_id: params[:user_member_challenge][:member_challenge_id]
    )
  end
end
