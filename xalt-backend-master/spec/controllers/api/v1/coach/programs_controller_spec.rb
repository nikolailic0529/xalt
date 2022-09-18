# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/coach/programs', type: :request do
  describe 'Coach' do
    let(:current_user)  { create(:user, :coach) }
    let(:another_coach) { create(:user, :coach) }
    let(:member)        { create(:user, :member) }
    let(:exercise)      { create(:exercise, user: current_user) }
    let(:exercise1)     { create(:exercise, user: current_user) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Programs CRUD' do
      describe 'Create' do
        let(:program_params) do
          {
            name:              'Super Program',
            description:       'It is description',
            member_profile_id: member.member_profile.id,
            coach_profile_id:  current_user.coach_profile.id,
            program_type:      'homework',
            program_date:      Time.zone.now + 1.hour,
            program_exercises: [{
              exercise_id:          exercise.id,
              sets:                 5,
              repetitions:          2,
              repetitions_duration: 4,
              link_url:             'link'
            },
                                {
                                  exercise_id:          exercise1.id,
                                  sets:                 5,
                                  repetitions:          2,
                                  repetitions_duration: 4,
                                  link_url:             'link'
                                }].to_json
          }
        end

        # context 'with valid params' do
        #   it 'returns 200 OK status' do
        #     post(api_v1_coach_programs_path, headers: headers, params: program_params)

        #     expect(response).to have_http_status(:ok)
        #     expect(json_response['program_exercises'].size).to eq 2
        #     expect(json_response['type']).to eq (Program::TYPES[program_params[:program_type]]).to_s
        #     expect(json_response['name']).to eq program_params[:name]
        #     expect(json_response['description']).to eq program_params[:description]
        #   end
        # end

        context 'with invalid params' do
          # context 'when no member profile' do
          #   before { program_params.update(member_profile_id: nil) }

          #   it 'returns 422 status' do
          #     post(api_v1_coach_programs_path, headers: headers, params: program_params)

          #     expect(response).to have_http_status(:unprocessable_entity)
          #   end
          # end

          context 'when no coach profile' do
            before { program_params.update(coach_profile_id: nil) }

            it 'returns 422 status' do
              post(api_v1_coach_programs_path, headers: headers, params: program_params)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end

          context 'when invalid program type' do
            before { program_params.update(program_type: 'something') }

            it 'returns 422 status' do
              post(api_v1_coach_programs_path, headers: headers, params: program_params)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to include('Program type must be homework or session')
            end
          end

          context 'when no exercise_id and link_url' do
            let(:program_params1) do
              {
                name:              'Super Program',
                description:       'It is description',
                member_profile_id: member.member_profile.id,
                coach_profile_id:  current_user.coach_profile.id,
                program_type:      'homework',
                program_date:      Time.zone.now + 1.hour,
                program_exercises: [{
                  sets:                 5,
                  repetitions:          2,
                  repetitions_duration: 4
                },
                                    {
                                      exercise_id:          exercise1.id,
                                      sets:                 5,
                                      repetitions:          2,
                                      repetitions_duration: 4,
                                      link_url:             'link'
                                    }].to_json
              }
            end

            it 'returns 422 status' do
              post(api_v1_coach_programs_path, headers: headers, params: program_params1)

              expect(response).to have_http_status(:unprocessable_entity)
              expect(json_response['errors'][0]['detail']).to include('Program should has exercise id or link url')
            end
          end
        end
      end

      describe 'Update' do
        let!(:program) { create(:program, :homework, coach_profile: current_user.coach_profile) }
        let!(:program_exercise) { create(:program_exercise, program: program, exercise: exercise) }
        let(:program_params) do
          {
            name:              'Changed name',
            description:       'It is changed description',
            program_type:      'homework',
            program_date:      Time.zone.now + 2.hours,
            program_exercises: [
              {
                "id":                   program_exercise.id.to_s,
                "sets":                 1,
                "repetitions":          1,
                "repetitions_duration": 1,
                "exercise_id":          exercise.id
              },
              {
                "exercise_id":          exercise1.id,
                "sets":                 8,
                "repetitions":          7,
                "repetitions_duration": 5
              }
            ].to_json
          }
        end

        context 'with valid params' do
          it 'returns 200 OK status' do
            put(api_v1_coach_program_path(program.id), headers: headers, params: program_params)

            expect(response).to have_http_status(:ok)
            expect(json_response['program_exercises'].size).to eq 2
            expect(json_response['type']).to eq (Program::TYPES[program_params[:program_type]]).to_s
            expect(json_response['name']).to eq program_params[:name]
            expect(json_response['description']).to eq program_params[:description]
          end
        end
      end

      describe 'Index' do
        let!(:homework_programs) { create_list(:program, 5, :homework, coach_profile: current_user.coach_profile) }
        let!(:session_programs)  { create_list(:program, 7, :session, coach_profile: current_user.coach_profile) }
        let!(:homework_programs1) {
          create_list(:program, 2, :homework, coach_profile:     current_user.coach_profile,
                                              member_profile_id: homework_programs[0].member_profile.id)
        }

        context 'with valid params' do
          context 'when program_type is homework' do
            let(:program_params) {
              {program_type: 'homework', include: 'member_profile',
member_profile_id: homework_programs[0].member_profile.id}
            }

            it 'return 200 OK status' do
              get(api_v1_coach_programs_path, headers: headers, params: program_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq 3
            end
          end

          context 'when program_type is session' do
            let(:program_params) { {program_type: 'session'} }

            it 'return 200 OK status' do
              get(api_v1_coach_programs_path, headers: headers, params: program_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq session_programs.size
            end
          end

          context 'when current coach has no homework programs' do
            before { homework_programs.each { |item| item.update(coach_profile: another_coach.coach_profile) } }

            let(:program_params) { {program_type: 'homework'} }

            it 'return 200 OK status' do
              get(api_v1_coach_programs_path, headers: headers, params: program_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq homework_programs1.count
            end
          end
        end
      end

      describe 'Show' do
        let!(:homework_program) { create(:program, :homework, coach_profile: current_user.coach_profile) }

        context 'with valid params' do
          let(:program_params) { {include: 'coach_profile'} }

          it 'return 200 OK status' do
            get(api_v1_coach_program_path(homework_program.id), headers: headers, params: program_params)

            expect(response).to have_http_status(:ok)
            expect(json_response['coach_profile']['id']).to eq current_user.coach_profile.id
            expect(json_response['type']).to eq homework_program.type
          end
        end

        context 'with invalid params' do
          context "when coach get other's coach program" do
            before { homework_program.update(coach_profile: another_coach.coach_profile) }

            it 'raises exception' do
              expect { get(api_v1_coach_program_path(homework_program.id), headers: headers) }
                .to raise_exception(ActiveRecord::RecordNotFound)
            end
          end
        end
      end
    end
  end
  # describe 'Admin' do
  # end

  # describe 'Member' do
  # end
end
