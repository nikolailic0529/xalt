# frozen_string_literal: true

class Api::V1::Member::MemberCrvesController < AuthenticatedController
  # GET /api/v1/member/member_crves
  def index
    @member_answer = current_user.member_question_answer
    @new_params = if @member_answer.present?
                    {
                      sex: @member_answer.answer['GenralHealthHistoryQuestions']['1']['current'],
                      age: @member_answer.answer['GenralHealthHistoryQuestions']['0']['current'].to_i,
                      wc:  @member_answer.answer['GenralHealthHistoryQuestions']['2']['current'].to_f,
                      rhr: @member_answer.answer['GenralHealthHistoryQuestions']['7']['current'].to_f,
                      pa:  calculate_pa_index,
                      crf: 0,
                    }
                  else
                    {
                      sex: '',
                      age: 0,
                      wc:  0,
                      rhr: 0,
                      pa:  0,
                      crf: 0,
                    }
                  end

    calculate_crf_value

    binding.pry
    render json: @new_params
  end

  # GET /api/v1/member/member_crves/1
  def show
    render json: @api_v1_member_member_crf
  end

  # POST /api/v1/member/member_crves
  # rubocop:disable Metrics/AbcSize
  def create
    if params[:member_id]
      member = MemberProfile.find(params[:member_id])
      @member_user = member.user
    else
      @member_user = current_user
    end

    @member_answer = @member_user.member_question_answer
    @new_params = if @member_answer.present?
                    {
                      sex: @member_answer.answer['GenralHealthHistoryQuestions']['1']['current'],
                      age: @member_answer.answer['GenralHealthHistoryQuestions']['0']['current'].to_i,
                      wc:  @member_answer.answer['GenralHealthHistoryQuestions']['2']['current'].to_f,
                      rhr: @member_answer.answer['GenralHealthHistoryQuestions']['7']['current'].to_f,
                      pa:  calculate_pa_index,
                      crf: 0,
                    }
                  else
                    {
                      sex: '',
                      age: 0,
                      wc:  0,
                      rhr: 0,
                      pa:  0,
                      crf: 0,
                    }
                  end

    calculate_crf_value
    @api_v1_member_member_crf = MemberCrf.new(@new_params.merge(user: current_user))

    # if @api_v1_member_member_crf.save
    render(json: @api_v1_member_member_crf, serializer: Members::MemberCrfSerializer, status: :ok)
    # else
    # render json: @api_v1_member_member_crf.errors, status: :unprocessable_entity
    # end
  end
  # rubocop:enable Metrics/AbcSize

  # rubocop:disable Metrics/MethodLength, Metrics/PerceivedComplexity, Metrics/AbcSize, Metrics/CyclomaticComplexity
  def recommendations
    if params[:member_id]
      member = MemberProfile.find(params[:member_id])
      @member_user = member.user
    else
      @member_user = current_user
    end

    @member_answer = @member_user.member_question_answer
    # rubocop:disable Security/JSONLoad
    questions = JSON.load(File.open('xalt-questions.json'))
    # rubocop:enable Security/JSONLoad
    result = {}

    recommendation_indexes = {
      balance:      [3, 4, 6, 9, 10, 59, 75, 76],
      joint_health: [8, 9, 10, 59, 75, 76, 21, 22, 23, 24, 25, 26],
      endurance:    [8, 9, 10, 59, 75, 76, 21, 22, 23, 24, 25, 26],
      muscle:       [8, 9, 10, 59, 75, 76, 21, 22, 23, 24, 25, 26],
      sleep:        [3, 4, 6, 46, 47, 48, 49, 50, 51, 52, 53, 59, 75, 76, 84],
      diet:         [3, 4, 6, 11, 12, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 59, 75,
                     76],
    }

    recommendation_indexes.each do |recommendation, indexes|
      recommendation_score = 0
      indexes.each do |recommendation_index|
        question_answer_block = get_question_answer_block(recommendation_index)
        score = 0
        if @member_answer.present?
          begin
            question_answer = @member_answer.answer[question_answer_block.to_s][recommendation_index.to_s]['current']
            questions[question_answer_block.to_s].each do |question|
              next unless question['id'] == recommendation_index

              # rubocop:disable Style/CaseLikeIf
              if question['type'] == 'input'
                score = 100 unless question_answer.empty?
                break
              elsif question['type'] == 'select'
                question['options'].each_with_index do |question_option, option_index|
                  if question_option['value'] == question_answer
                    score = (option_index + 1) * 100 / question['options'].length
                    break
                  end
                end
                break
              elsif question['type'] == 'multiple'
                selected_count = 0
                if question_answer.instance_of? Object
                  question_answer.each do |question_answer_options|
                    # rubocop:disable Metrics/BlockNesting
                    selected_count += 1 if question_answer_options
                    # rubocop:enable Metrics/BlockNesting
                  end
                  score = selected_count * 100 / question['options'].length
                  break
                end
              end
              # rubocop:enable Style/CaseLikeIf
            end
          rescue StandardError
          end
        end
        recommendation_score += score
      end

      result[recommendation] = recommendation_score / indexes.length
    end
    render(json: result, status: :ok)
  end
  # rubocop:enable Metrics/MethodLength, Metrics/PerceivedComplexity, Metrics/AbcSize, Metrics/CyclomaticComplexity

  private

  def calculate_pa_index
    pa_answers1 = {'' => 1, 'less' => 1, 'once' => 2, 'two' => 3, 'almost' => 4}
    pa_index1 = pa_answers1[@member_answer.answer['FitnessQuestions']['22']['current']]

    pa_answers2 = {'' => 1, '15min' => 1, '30min' => 2, '60min' => 3, 'over' => 4}
    pa_index2 = pa_answers2[@member_answer.answer['FitnessQuestions']['23']['current']]

    pa_answers3 = {'' => 1, 'take' => 1, 'heavy' => 2, 'push' => 3}
    pa_index3 = pa_answers3[@member_answer.answer['FitnessQuestions']['24']['current']]

    pa_index1 * pa_index2 * pa_index3
  end

  def calculate_crf_value
    crf_value = 0
    case @new_params[:sex]
    when 'female'
      crf_value = 74.74 - (0.247 * @new_params[:age]) - (0.259 * @new_params[:wc])
      - (0.114 * @new_params[:rhr]) + (0.198 * @new_params[:pa])
    when 'male'
      crf_value = 100.27 - (0.296 * @new_params[:age]) - (0.369 * @new_params[:wc])
      - (0.155 * @new_params[:rhr]) + (0.226 * @new_params[:pa])
    end
    @new_params[:crf] = crf_value
  end

  def get_question_answer_block(index_number)
    block_key = nil
    member_question_answer_blocks = {
      GenralHealthHistoryQuestions: {start: 0, end: 20},
      FitnessQuestions:             {start: 21, end: 26},
      NutritionQuestions:           {start: 27, end: 45},
      SleepQuestions:               {start: 46, end: 53},
      StressQuestions:              {start: 54, end: 58},
      CommunityQuestions:           {start: 59, end: 69},
      GoalQuestions:                {start: 70, end: 82},
      PillarsQuestions:             {start: 83, end: 88},
    }

    member_question_answer_blocks.each do |block, block_info|
      block_key = block if index_number >= block_info[:start] && index_number <= block_info[:end]
    end
    block_key
  end
end
