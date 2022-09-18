# frozen_string_literal: true

class MarkMeetingAsFinishedJob < Core::BaseJob
  queue_as :meetings

  def perform(params)
    meeting = Meeting.joins(:coach_profile, :member_profile).find(params[:meeting_id])
    meeting.update!(is_finished: true) if meeting.present?
  end
end
