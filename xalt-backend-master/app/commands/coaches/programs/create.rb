# frozen_string_literal: true

module Coaches
  module Programs
    class Create < Core::BaseCommand
      attribute :current_user,      User
      attribute :name,              String
      attribute :description,       String
      attribute :coach_profile_id,  String
      attribute :member_profile_id, String
      attribute :program_type,      String
      attribute :program_exercises, Virtus::JsonapiJsonFilterAttributes
      attribute :program_date,      String

      validates :name, :description, :member_profile_id, presence: true
      validates :program_date, presence: true
      validate :program_type_is_valid?
      validate :member_can_have_session?
      validate :coach_can_not_create_program_in_past_time
      validate :program_exercise_should_has_exercise_id_or_link_url
      include Core::BaseValidator

      attr_reader :program

      def authorized?
        current_user.coach? || current_user.admin?
      end

      def process
        Program.transaction do
          create_program
          create_program_exercises
          NotificationService.call(user_id: program.member_profile.user_id, type: :new_homework,
                                   coach_profile_id: program.coach_profile.id, program_date: program_date)
          Notifications::TodayHomeworkNotificationJob
            .set(wait_until: program.program_date.beginning_of_day).perform_later(program.id)
        end
      end

      def broadcast_ok
        broadcast(:ok, program)
      end

      protected

      def create_program
        @program = Program::TYPES[program_type].create!(params)

        member = MemberProfile.find_by(id: params[:member_profile_id])
        lesson_count = member.user.lesson_count
        member.user.update!(lesson_count: lesson_count - 1) if lesson_count
      end

      def params
        updated_attributes.except!(:current_user, :program_exercises, :program_type)
      end

      def create_program_exercises
        program.program_exercises.create!(program_exercises)
      end

      def program_type_is_valid?
        errors.add(:program, :program_type_must_be_valid) if %w[homework session].exclude?(program_type)
      end

      def member_can_have_session?
        member = MemberProfile.find_by(id: params[:member_profile_id])
        lesson_count = member.user.lesson_count
        errors.add(:program, :no_subscription) if !lesson_count && !member.subscription
      end

      def coach_can_not_create_program_in_past_time
        return if program_date.blank?
        return if program_date.to_time > Time.zone.now

        errors.add(:program, :coach_can_not_create_program_in_past_time)
      end

      def program_exercise_should_has_exercise_id_or_link_url
        arr = program_exercises.pluck('exercise_id', 'link_url')
        errors.add(:program, :program_exercise_should_has_exercise_id_or_link_url) if arr.include?([nil, nil])
      end
    end
  end
end
