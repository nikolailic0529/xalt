# frozen_string_literal: true

class Core::BaseCommand < Core::BaseInput
  include Wisper::Publisher

  def self.call(*args)
    temp = new(*args).tap do |obj|
      yield obj if block_given?
    end
    temp.call
  end

  def call
    return broadcast_unauthorized unless authorized?
    return broadcast_invalid unless valid?

    process
    broadcast_ok
  end

  def broadcast_unauthorized
    broadcast(:unauthorized)
  end

  def broadcast_invalid
    broadcast(:invalid, errors)
  end

  def broadcast_ok
    broadcast(:ok)
  end

  def authorized?
    false
  end

  protected

  def process
    raise 'Interface not implemented'
  end

  def t(*args)
    I18n.t(['commands', self.class.name.underscore, *args].join('.'))
  end

  def to_boolean(str)
    str == 'true'
  end
end
