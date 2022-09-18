# frozen_string_literal: true

class Core::BaseService < Core::BaseInput
  include Core::Helpers::CommandMethods

  def self.call(*args)
    new(*args).tap do |obj|
      yield obj if block_given?
    end.call
  end

  def call
    raise 'Implement'
  end
end
