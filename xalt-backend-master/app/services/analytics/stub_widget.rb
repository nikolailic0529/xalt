# frozen_string_literal: true

module Analytics
  class StubWidget < Core::BaseService
    def call
      'Widget does not implemented or you make mistake in widget name!'
    end
  end
end
