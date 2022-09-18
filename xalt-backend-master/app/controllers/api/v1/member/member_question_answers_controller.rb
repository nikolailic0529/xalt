# frozen_string_literal: true

class Api::V1::Member::MemberQuestionAnswersController < AuthenticatedController
  before_action :set_api_v1_member_question_answer, only: %i[show update destroy]

  # GET /api/v1/member_question_answers
  def index
    @api_v1_member_question_answers = current_user.member_question_answer

    render json: @api_v1_member_question_answers
  end

  # GET /api/v1/member_question_answers/1
  def show
    render json: @api_v1_member_question_answer
  end

  # POST /api/v1/question_answer_for_member
  def question_answer_for_member
    if params[:member_id]
      member = MemberProfile.find(params[:member_id])
      @member_user = member.user
    else
      @member_user = current_user
    end

    render json: @member_user.member_question_answer
  end

  # POST /api/v1/member_question_answers
  def create
    @api_v1_member_question_answer = run_command!(Members::MemberQuestionAnswers::Create,
                                                  params_with_current_user.merge(user: current_user))

    render(json: @api_v1_member_question_answer, serializer: Members::MemberQuestionAnswersSerializer, status: :ok)
  end

  # PATCH/PUT /api/v1/member_question_answers/1
  def update
    @api_v1_member_question_answer = run_command!(
      Members::MemberQuestionAnswers::Update,
      params_with_current_user.merge(user:                   current_user,
                                     member_question_answer: find_member_question_answer)
    )

    render(json: @api_v1_member_question_answer, serializer: Members::MemberQuestionAnswersSerializer, status: :ok)
  end

  # DELETE /api/v1/member_question_answers/1
  def destroy
    @api_v1_member_question_answer.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_api_v1_member_question_answer
    @api_v1_member_question_answer = MemberQuestionAnswer.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def api_v1_member_question_answer_params
    params.fetch(:api_v1_member_question_answer, {})
  end

  def find_member_question_answer_query
    Members::MemberQuestionAnswers::BaseQuery.call(params_with_current_user)
  end

  def find_member_question_answer
    find_member_question_answer_query.find(params_with_current_user[:id])
  end
end
