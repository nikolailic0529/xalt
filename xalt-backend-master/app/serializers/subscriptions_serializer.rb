# frozen_string_literal: true

class SubscriptionsSerializer < ActiveModel::Serializer
  type :subscriptions

  attributes :id, :description, :sessions_count, :type, :amount, :stripe_price_id, :additional_information
end
