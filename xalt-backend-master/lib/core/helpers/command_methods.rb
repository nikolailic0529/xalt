# frozen_string_literal: true

module Core::Helpers
  module CommandMethods
    def run_command_and_return_result_or_nil(command, *args)
      result = nil
      run_command(command, *args) do |broadcast|
        broadcast.on(:ok) do |command_result|
          result = yield(command_result) if block_given?
        end
      end
      result
    end

    def run_command(command_class, *args, &block)
      command_class.call(*args, &block)
    end

    def run_command!(command_name, *args)
      result = nil
      run_command(command_name, *args) do |broadcast|
        broadcast.on(:ok) do |command_result|
          result = block_given? ? yield(command_result) : command_result
        end
        broadcast.on(:invalid) do |errors|
          throw Core::Errors::InvalidArgumentsError.new(errors.full_messages.join(', '), errors.to_hash)
        end
        broadcast.on(:unauthorized) do |_command_result|
          # errors.full_messages.join(", ")
          throw Core::Errors::UnauthorizedError.new(I18n.t('errors.unauthorized_action'))
        end
      end
      result
    end
  end
end
