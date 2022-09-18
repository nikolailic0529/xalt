# frozen_string_literal: true

module Subscriptions
  class BaseQuery < Core::BaseQuery
    def base_relation
      Subscription.all
    end
  end
end
