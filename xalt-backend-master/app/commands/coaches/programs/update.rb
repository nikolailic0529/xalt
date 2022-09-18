# frozen_string_literal: true

module Coaches
  module Programs
    class Update < Core::BaseCommand
      attribute :current_user,      User
      attribute :program,           Program
      attribute :name,              String
      attribute :description,       String
      attribute :program_type,      String
      attribute :program_exercises, Virtus::JsonapiJsonFilterAttributes
      attribute :program_date,      String

      validates :name, :description, presence: true
      validates :program_date, presence: true
      validate :program_type_is_valid?
      validate :coach_can_not_update_program_in_past_time
      validate :program_exercise_should_has_exercise_id_or_link_url
      include Core::BaseValidator

      def authorized?
        current_user.coach? || current_user.admin?
      end

      def process
        Program.transaction do
          update_program
          update_program_exercises
          program.reload
        end
      end

      def broadcast_ok
        broadcast(:ok, program)
      end

      protected

      def update_program
        program.update!(params)
      end

      def params
        updated_attributes.except!(:current_user, :program_exercises, :program_type, :program)
      end

      def update_program_exercises
        program_exercises&.each do |item|
          exercise = program.program_exercises.find_by(id: item['id'])
          if exercise
            exercise.update(item)
          else
            program.program_exercises.create!(item)
          end
        end
      end

      def program_type_is_valid?
        errors.add(:program, :program_type_must_be_valid) if %w[homework session].exclude?(program_type)
      end

      def coach_can_not_update_program_in_past_time
        return if program_date.blank?
        return if program_date.to_time > Time.zone.now

        errors.add(:program, :coach_can_not_update_program_in_past_time)
      end

      def program_exercise_should_has_exercise_id_or_link_url
        arr = program_exercises.pluck('exercise_id', 'link_url')
        errors.add(:program, :program_exercise_should_has_exercise_id_or_link_url) if arr.include?([nil, nil])
      end
    end
  end
end
