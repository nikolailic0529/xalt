# frozen_string_literal: true

module Coaches
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User
    attribute :type, String

    def base_relation
      if current_user.blank? || current_user.admin?
        return User.where(role: 'coach').where(coach_profiles: {rehabilitation: true}) if type == 'rehabilitation'

        return User.where(role: 'coach').where(coach_profiles: {featured: true})
      end

      if current_user.member?
        return User.joins(coach_profile: {fitnes_domains: %i[coaches members]})
                   .distinct
                   .where(member_profiles: {id: current_user.member_profile.id})
                   .where(coach_profiles: {featured: true})
      end

      User.none
    end
  end
end
