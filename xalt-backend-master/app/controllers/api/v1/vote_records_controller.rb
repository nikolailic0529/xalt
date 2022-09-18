# frozen_string_literal: true

class Api::V1::VoteRecordsController < ApplicationController
  before_action :set_vote_record, only: %i[show update destroy]

  # GET /vote_records
  def index
    @vote_records = VoteRecord.all

    render json: @vote_records
  end

  # GET /vote_records/1
  def show
    render json: @vote_record
  end

  # POST /vote_records
  def create
    return unless user_not_voted

    @vote_record = VoteRecord.new(vote_record_params)

    if @vote_record.save
      render json: @vote_record, status: :created
    else
      render json: @vote_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vote_records/1
  def update
    if @vote_record.update(vote_record_params)
      render json: @vote_record
    else
      render json: @vote_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /vote_records/1
  def destroy
    @vote_record.destroy
    render(json: {}, status: :ok)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_vote_record
    @vote_record = VoteRecord.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def vote_record_params
    params.require(:vote_record).permit(:user_id, :exercise_id, :is_yes)
  end

  def user_not_voted
    VoteRecord.find_by(user_id:     params[:vote_record][:user_id],
                       exercise_id: params[:vote_record][:exercise_id]).blank?
  end
end
