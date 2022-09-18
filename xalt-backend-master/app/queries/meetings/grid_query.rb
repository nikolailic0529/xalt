# frozen_string_literal: true

module Meetings
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :time_from
    attribute :time_to
    attribute :is_finished, Virtus::JsonapiBooleanFilterAttributes
    attribute :member_profile_id, String

    def base_relation
      Meetings::BaseQuery.call(current_user: current_user).distinct.merge(time_range_filter)
    end

    def execute
      self.relation = relation.where(is_finished: is_finished) if is_finished.present? || is_finished == false
      self.relation = relation.where(member_profile_id: member_profile_id) if member_profile_id.present?
    end

    private

    def time_range_filter
      Meetings::Filters::TimeRangeFilter.call(updated_attributes)
    end
  end
end
