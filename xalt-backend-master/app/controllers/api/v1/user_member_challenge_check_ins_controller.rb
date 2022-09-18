# frozen_string_literal: true

class Api::V1::UserMemberChallengeCheckInsController < AuthenticatedController
  require 'date'
  before_action :set_checkin_type, only: %i[create]

  # Get ALL checkins for a given challenge
  def index
    params.require(:member_challenge_id)
    user_member_challenge_checkins = UserMemberChallengeCheckIn.where(
      member_challenge_id: params[:member_challenge_id]
    )
    render json: user_member_challenge_checkins, each_serializer: UserMemberChallengeCheckInsSerializer, status: :ok
  end

  # get checkins for a given challenge and user (prefered)
  def show
    params.require(:user_id)
    user_member_challenge_checkins = UserMemberChallengeCheckIn.where(
      member_challenge_id: params[:id],
      user_id:             params[:user_id]
    )
    render json: user_member_challenge_checkins, each_serializer: UserMemberChallengeCheckInsSerializer, status: :ok
  end

  def create
    check_in_params = params.require(:user_member_challenge_check_in)

    unless @checkin_status
      return render json: {message: 'You do not have permissions to create this check in'}, status: :forbidden
    end

    @user_member_challenge_check_in = find_member_challenge_check_in(check_in_params)
    if @user_member_challenge_check_in
      check_in_hash = user_member_challenge_check_in_params.to_h
      check_in_hash[:checkin_status] = @checkin_status unless check_in_hash[:checkin_status] == 'verified'
      @user_member_challenge_check_in.update(check_in_hash)
      return render json: @user_member_challenge_check_in, serializer: UserMemberChallengeCheckInsSerializer,
                    status: :ok
    end

    @user_member_challenge_check_in = UserMemberChallengeCheckIn.new(user_member_challenge_check_in_params)
    @user_member_challenge_check_in.checkin_status = @checkin_status
    if @user_member_challenge_check_in.save
      render json: @user_member_challenge_check_in, serializer: UserMemberChallengeCheckInsSerializer,
             status: :created
    else
      render json: @user_member_challenge_check_in.errors, status: :unprocessable_entity
    end
  end

  def update
    # only challenge owner should use this endpoint
    check_ins = params.require(:user_member_challenge_check_ins)
    challenge_id = params.require(:challenge_id)
    same_challenge = check_ins.all? do |val|
      val[:member_challenge_id] == challenge_id
    end

    unless same_challenge
      return render json: {message: 'all check in must be part of the same challenge'}, status: :bad_request
    end

    challenge = find_challenge_by_id(challenge_id)
    if challenge[:user_id] != current_user_id
      return render json: {message: 'must be owner of challenge to verify checkin'}, status: :forbidden
    end

    successful_updates = []
    failed_errors = []
    check_ins.each do |check_in|
      check_in_record = find_member_challenge_check_in(check_in)
      check_in[:checkin_status] = 'verified'
      if check_in_record.update(check_in)
        successful_updates.append(check_in_record)
      else
        failed_errors.append(check_in_record)
      end
    end

    render json: {updated: successful_updates, failed: failed_errors},
           each_serializer: UserMemberChallengeCheckInsSerializer, status: :ok
  end

  def destroy
    nil
  end

  private

  def user_member_challenge_check_in_params
    input = params.require(:user_member_challenge_check_in).permit(:user_id, :member_challenge_id, :checkin_status,
                                                                   :checkin_date, :comments, :proof)
    input[:checkin_date] = DateTime.strptime(input[:checkin_date], '%Y-%m-%dT%H:%M:%S%z')
    input
  end

  def set_checkin_type
    params.require(
      :user_member_challenge_check_in
    ).require(%i[user_id member_challenge_id checkin_date])
    checkin_params = params[:user_member_challenge_check_in]
    challenge = MemberChallenge.find_by(
      id: checkin_params[:member_challenge_id]
    )
    @checkin_status = if current_user_id == challenge[:user_id]
                        'verified'
                      elsif current_user_id == checkin_params[:user_id]
                        'unverified'
                      end
  end

  def find_member_challenge_check_in(check_in)
    UserMemberChallengeCheckIn.find_by(
      user_id:             check_in[:user_id],
      member_challenge_id: check_in[:member_challenge_id],
      checkin_date:        DateTime.strptime(check_in[:checkin_date], '%Y-%m-%dT%H:%M:%S%z')
    )
  end

  def find_challenge_by_id(id)
    MemberChallenge.find_by(id: id)
  end

  def current_user_id
    params_with_current_user['current_user'].id
  end
end
