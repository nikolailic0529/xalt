# frozen_string_literal: true

module Analytics
  module Widgets
    class MeetingsCountByMember < Analytics::BaseWidget
      attribute :member_profile_id, String
      attribute :time_from, DateTime
      attribute :time_to, DateTime

      def call
        Meetings::GridQuery
          .call(widget_params.merge!(updated_attributes))
          .select('meetings.member_profile_id as id', 'COUNT(meetings.member_profile_id) as value')
          .group('meetings.member_profile_id')
          .as_json
      end
    end
  end
end
