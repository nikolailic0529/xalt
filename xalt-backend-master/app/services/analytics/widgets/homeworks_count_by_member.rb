# frozen_string_literal: true

module Analytics
  module Widgets
    class HomeworksCountByMember < Analytics::BaseWidget
      def call
        Programs::GridQuery.call(current_user: current_user, type: 'homework', pagination: false, ordering: false)
                           .joins(:member_profile)
                           .group('member_profiles.user_id')
                           .count
      end
    end
  end
end
