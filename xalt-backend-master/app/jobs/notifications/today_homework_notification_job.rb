# frozen_string_literal: true

class Notifications::TodayHomeworkNotificationJob < ApplicationJob
  queue_as :prepare_notification

  def perform(program_id)
    program = Program.find(program_id)
    NotificationService.call(user_id: program.member_profile.user_id, type: :today_homework, program_id: program.id)
  end
end
