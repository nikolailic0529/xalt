# frozen_string_literal: true

module Analytics
  class BaseWidget < Core::BaseService
    attribute :current_user, User
    attribute :filters, Hash, default: {}

    def self.filters(*args)
      @filters ||= args
    end

    def available_filters
      self.class.filters || []
    end

    def widget_params
      @widget_params ||= begin
        widget_params = {current_user: current_user, pagination: false, ordering: false}

        filters.deep_symbolize_keys.each_with_object(widget_params) do |(key, value), res|
          res.merge!(key.to_sym => value) if available_filters.include?(key)
        end
      end
    end
  end
end
