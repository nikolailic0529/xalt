# frozen_string_literal: true

class MeetingsSerializer < ActiveModel::Serializer
  type :meetings
  attributes :id, :coach_profile_id, :google_meet_url, :member_profile_id, :time_to, :time_from, :is_member_confirmed,
             :is_finished, :report_id

  belongs_to :coach_profile, serializer: Coaches::ProfilesSerializer
  belongs_to :member_profile, serializer: Members::ProfilesSerializer
  belongs_to :program, serializer: ::ProgramsSerializer
  has_one :report, serializer: Coaches::ReportSerializer
end
