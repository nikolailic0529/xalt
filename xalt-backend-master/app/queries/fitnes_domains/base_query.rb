# frozen_string_literal: true

module FitnesDomains
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return FitnesDomain.all if current_user.present?

      FitnesDomain.none
    end
  end
end
