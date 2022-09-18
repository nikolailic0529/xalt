# frozen_string_literal: true

module Core::Errors
  class InvalidArgumentsError < StandardError
    attr_reader :fields

    def initialize(message, fields={})
      @fields = fields
      super(message)
    end
  end

  class UnauthorizedError < StandardError; end
end
