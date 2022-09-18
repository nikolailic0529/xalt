# frozen_string_literal: true

class Api::V1::SubscriptionsController < ApplicationController
  def index
    subscriptions = find_subscriptions_grid_query

    render(json: subscriptions, each_serializer: ::SubscriptionsSerializer, status: :ok)
  end

  private

  def find_subscriptions_grid_query
    Subscriptions::GridQuery.call(jsonapi_params_to_query_options)
  end
end
