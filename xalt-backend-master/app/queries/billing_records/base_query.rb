# frozen_string_literal: true

module BillingRecords
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return BillingRecord.all if current_user.admin? || current_user.coach?

      BillingRecord.none
    end

    def execute
      self.relation = relation.where(coach_profile: current_user.coach_profile) if current_user.coach?
    end
  end
end
