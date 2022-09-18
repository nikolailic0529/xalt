# frozen_string_literal: true

module Members
  module Programs
    class Update < Core::BaseCommand
      attribute :current_user, User
      attribute :program,      Program
      attribute :completed,    Virtus::JsonapiBooleanFilterAttributes

      validates :current_user, :program, :completed, presence: true

      def authorized?
        current_user.member?
      end

      def process
        ActiveRecord::Base.transaction do
          update_program
          program.reload
          create_notification if program.completed
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
        updated_attributes.except!(:current_user, :program)
      end

      def create_notification
        NotificationService.call(user_id:             program.coach_profile.user_id,
                                 type:                :complete_homework,
                                 notification_sender: program.member_profile.user.name,
                                 member_profile_id:   program.member_profile.id,
                                 program_date:        program.program_date)
      end
    end
  end
end
