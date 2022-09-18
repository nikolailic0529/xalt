# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/coach/program_exercises', type: :request do
  describe 'Coach' do
    let(:current_user)       { create(:user, :coach) }
    let(:member)             { create(:user, :member) }
    let!(:homework_program)  { create(:program, :homework, coach_profile: current_user.coach_profile) }
    let!(:program_exercises) { create_list(:program_exercise, 5, program: homework_program) }

    let(:headers) do
      auth_headers(current_user).merge(content_type: 'application/json', accept: 'application/json')
    end

    describe 'ProgramExercises CRUD' do
      describe 'Destroy' do
        context 'with valid params' do
          it 'return 200 OK status' do
            delete(api_v1_coach_program_exercise_path(program_exercises.first.id), headers: headers)

            expect(response).to have_http_status(:ok)
          end

          it 'deletes program exercise' do
            expect { delete(api_v1_coach_program_exercise_path(program_exercises.first.id), headers: headers) }
              .to change(ProgramExercise, :count).by(-1)
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
