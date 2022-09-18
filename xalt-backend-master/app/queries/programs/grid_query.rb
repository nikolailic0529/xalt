# frozen_string_literal: true

module Programs
  class GridQuery < Core::Queries::GridQuery
    attribute :current_user, User
    attribute :program_type, String
    attribute :member_profile_id, String
    attribute :time_from
    attribute :time_to

    def base_relation
      Programs::BaseQuery.call(current_user: current_user).merge(time_range_filter)
    end

    def execute
      self.relation = relation.where(type: (Program::TYPES[program_type]).to_s) if program_type.present?
      self.relation = relation.where(member_profile_id: member_profile_id) if member_profile_id.present?
    end

    private

    def time_range_filter
      Programs::Filters::TimeRangeFilter.call(updated_attributes)
    end
  end
end
