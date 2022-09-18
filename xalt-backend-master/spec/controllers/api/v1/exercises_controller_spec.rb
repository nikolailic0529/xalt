# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/coach/exercises', type: :request do
  describe 'Coach' do
    let(:current_user)  { create(:user, :coach) }
    let(:another_coach) { create(:user, :coach, email: 'another@test.com') }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'Exercises CRUD' do
      describe 'Create' do
        context 'with valid params' do
          let(:exercise_params) do
            {
              name:            'Super Exercise',
              description:     'Description Here',
              categorie:       'upper_body',
              equipment:       'barbell',
              difficulty:      'beginner',
              agonist:         'agonist',
              movement:        'movement',
              relevant:        'relevant',
              start_pos:       'start_pos',
              end_pos:         'end_pos',
              instruction:     'instruction',
              is_competition:  false,
              vimeo_video_url: '',
              is_private:      true,
              vote_record:     []
            }
          end

          it 'returns 200 OK status' do
            post(api_v1_exercises_path, headers: headers, params: exercise_params)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('user', 'id', 'created_at', 's3_video_file', 'video_url')).to match(
              exercise_params.stringify_keys.merge('vimeo_video_info' => {})
            )
          end
        end
      end

      describe 'Index' do
        let!(:exercises1) { create_list(:exercise, 40, user: current_user) }
        let!(:exercises2) { create_list(:exercise, 30, user: another_coach) }

        context 'without params' do
          it 'returns 200 OK status and get only current coach exercises on the first page' do
            get(api_v1_exercises_path, headers: headers, params: {include: 'user'})

            expect(response).to have_http_status(:ok)
            expect(json_response.size).to eq Core::Queries::Concerns::PaginatedQuery::DEFAULT_PAGE_SIZE
          end
        end

        context 'with valid params' do
          context 'when page param' do
            let(:exercise_params) { {page: 2} }

            it 'returns 200 OK status and get only current coach exercises on the second page' do
              get(api_v1_exercises_path, headers: headers, params: exercise_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size)
                .to eq(exercises1.size - Core::Queries::Concerns::PaginatedQuery::DEFAULT_PAGE_SIZE)
            end
          end

          # context 'when sort param' do
          #   let(:exercise_params) { {sort: 'name'} }

          #   it 'returns 200 OK status and get sorted result' do
          #     get(api_v1_exercises_path, headers: headers, params: exercise_params)

          #     expect(response).to have_http_status(:ok)
          #     result = json_response.pluck('name')
          #     expect(result).to eq result.sort
          #   end
          # end

          context 'when page param more than existing pages' do
            let(:exercise_params) { {page: 5} }

            it 'returns 200 OK status and no exercises' do
              get(api_v1_exercises_path, headers: headers, params: exercise_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq 0
            end
          end

          context "when 'difficulty' filter" do
            before { exercises1[0..4].each { |item| item.update(difficulty: 'intermediate') } }

            let(:exercise_params) { {difficulty: 'intermediate'} }

            it 'returns 200 OK status and get only current coach exercises with difficulty filter' do
              get(api_v1_exercises_path, headers: headers, params: exercise_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq 5
              json_response.each do |item|
                expect(item['difficulty']).to eq 'intermediate'
              end
            end
          end

          context "when 'categorie' filter" do
            before { exercises1[0..9].each { |item| item.update(categorie: 'core', name: 'test') } }

            let(:exercise_params) { {search_string: 'tes', categorie: 'core', sort: 'created_at'} }

            it 'returns 200 OK status and get only current coach exercises with categorie filter' do
              get(api_v1_exercises_path, headers: headers, params: exercise_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq 10
              json_response.each do |item|
                expect(item['categorie']).to eq 'core'
              end
            end
          end

          context "when 'equipment' filter" do
            before { exercises1[0..14].each { |item| item.update(equipment: 'barbell') } }

            let(:exercise_params) { {equipment: 'barbell'} }

            it 'returns 200 OK status and get only current coach exercises with equipment filter' do
              get(api_v1_exercises_path, headers: headers, params: exercise_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq 25
              json_response.each do |item|
                expect(item['equipment']).to eq 'barbell'
              end
            end
          end

          context 'when two filters' do
            before do
              exercises1[0..9].each { |item| item.update(equipment: 'barbell') }
              exercises1[0..4].each { |item| item.update(categorie: 'core') }
            end

            let(:exercise_params) { {equipment: 'barbell', categorie: 'core'} }

            it 'returns 200 OK status and get only current coach exercises with two filters' do
              get(api_v1_exercises_path, headers: headers, params: exercise_params)

              expect(response).to have_http_status(:ok)
              expect(json_response.size).to eq 5
              json_response.each do |item|
                expect(item['equipment']).to eq 'barbell'
                expect(item['categorie']).to eq 'core'
              end
            end
          end

          describe 'search parameter' do
            let!(:exercise_to_search) { create(:exercise, name: 'Find me!', user: current_user) }
            let!(:exercise_to_search1) { create(:exercise, name: 'Find me again!', user: current_user) }

            context 'when search param exist' do
              let(:exercise_params) { {search_string: 'Find'} }

              it 'gets searching exercises' do
                get(api_v1_exercises_path, headers: headers, params: exercise_params)

                expect(response).to have_http_status(:ok)
                expect(json_response.size).to eq 2
              end
            end

            context 'when search param is wrong' do
              let(:exercise_params) { {search_string: 'qwerty'} }

              it 'gets searching exercises' do
                get(api_v1_exercises_path, headers: headers, params: exercise_params)

                expect(response).to have_http_status(:ok)
                expect(json_response).to eq []
              end
            end
          end
        end
      end

      describe 'Show' do
        context 'with valid params' do
          let!(:exercise) { create(:exercise, user: current_user) }

          it 'returns 200 OK status' do
            get(api_v1_exercise_path(exercise.id), headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('user',
                                        'created_at',
                                        'updated_at',
                                        's3_video_file',
                                        'vote_record',
                                        'video_url')).to match(exercise.attributes.except('user_id',
                                                                                          'created_at',
                                                                                          'updated_at',
                                                                                          's3_video_file',
                                                                                          'vote_record',
                                                                                          'video_url'))
          end
        end
      end

      describe 'Update' do
        context 'with valid params' do
          let!(:exercise) { create(:exercise, user: current_user) }
          let(:exercise_params) do
            {
              name:            'Super Exercise',
              description:     'Description Here',
              categorie:       'upper_body',
              equipment:       'barbell',
              difficulty:      'beginner',
              agonist:         'agonist',
              movement:        'movement',
              relevant:        'relevant',
              start_pos:       'start_pos',
              end_pos:         'end_pos',
              instruction:     'instruction',
              is_competition:  false,
              vimeo_video_url: '',
              is_private:      true,
              vote_record:     []
            }
          end

          it 'returns 200 OK status' do
            patch(api_v1_exercise_path(exercise.id), params: exercise_params, headers: headers)

            expect(response).to have_http_status(:ok)
            expect(json_response.except('user', 'id')).not_to match(exercise.attributes.except('user_id'))
            expect(json_response.except('user', 'id', 'created_at', 's3_video_file', 'video_url')).to match(
              exercise_params.stringify_keys.merge('vimeo_video_info'=>{'video_url'=>'https://video.com/123'})
            )
          end
        end
      end
    end
  end
end
