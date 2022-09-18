# frozen_string_literal: true

module Analytics
  module Widgets
    class MembersCountByCoach < Analytics::BaseWidget
      def call
        Members::GridQuery.call(current_user: current_user, pagination: false, ordering: false)
                          .joins(member_profile: :coach_profile)
                          .select('coach_profiles.user_id as id', 'COUNT(coach_profiles.user_id) as value')
                          .group('coach_profiles.user_id')
                          .as_json
      end
    end
  end
end
