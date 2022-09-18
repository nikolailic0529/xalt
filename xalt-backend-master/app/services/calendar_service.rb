# frozen_string_literal: true

class CalendarService < Core::BaseService
  attribute :coach_profile_id
  attribute :member_profile_id
  attribute :time_from
  attribute :time_to

  # TODO: need to refactoring this service
  def call
    cal = GoogleCalendar.new.calendar
    coach_profile = CoachProfile.find(coach_profile_id)
    member_profile = MemberProfile.find(member_profile_id)
    create_event(cal, coach_profile, member_profile, time_from, time_to)
  end

  def create_event(cal, coach_profile, member_profile, time_from, time_to)
    calendar = cal.get_calendar('primary')
    conference_request = Google::Apis::CalendarV3::CreateConferenceRequest.new(
      request_id: ('a'..'z').to_a.sample(10).join.to_s
    )
    conference_data = Google::Apis::CalendarV3::ConferenceData.new(
      create_request: conference_request
    )
    event = Google::Apis::CalendarV3::Event.new(
      summary:         'Xalt Meeting',
      description:     "#{coach_profile.user.name} / #{member_profile.user.name}",
      start:           {
        date_time: time_from.to_datetime.rfc3339.to_s
      },
      end:             {
        date_time: time_to.to_datetime.rfc3339.to_s
      },
      attendees:       [{email: member_profile.user.email}, {email: coach_profile.user.email}],
      conference_data: conference_data
    )

    cal.insert_event(calendar.id, event, conference_data_version: 1)
  end
end
