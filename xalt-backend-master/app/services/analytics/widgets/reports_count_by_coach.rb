# frozen_string_literal: true

module Analytics
  module Widgets
    class ReportsCountByCoach < Analytics::BaseWidget
      def call
        Reports::GridQuery.call(current_user: current_user, pagination: false, ordering: false)
                          .joins(member_profile: :coach_profile)
                          .group('coach_profiles.user_id')
                          .count
      end
    end
  end
end
