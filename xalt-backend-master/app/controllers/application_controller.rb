# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  include ActionController::MimeResponds
  include Core::Helpers::CommandMethods

  rescue_from ActiveRecord::RecordInvalid, with: :process_invalid_error
  rescue_from Core::Errors::InvalidArgumentsError, with: :process_invalid_error

  # FIXME: for some reason original exception is wrapped with UncaughtThrowError
  #        that's simply is not right :)
  rescue_from UncaughtThrowError do |exception|
    original_exception = exception.tag
    case exception.message
    when /Core::Errors::UnauthorizedError/
      process_unauthorized_error(original_exception)
    when /Core::Errors::InvalidArgumentsError/
      process_invalid_error(original_exception)
    when /JSONAPI::Parser::InvalidDocument/
      process_invalid_document(original_exception)
    else
      throw original_exception
    end
  end

  def process_invalid_error(exception)
    errors = Errors::UnprocessableEntityErrorsSerializer.new(exception: exception).as_json
    render json: errors, status: :unprocessable_entity
  end

  def process_unauthorized_error(exception)
    errors = {errors: [{status: 401, code: :unauthorized, title: 'Unauthorized', detail: exception.message}]}
    render json: errors, status: :unauthorized
  end

  def jsonapi_params_to_query_options
    params.merge!(inclusions: inclusions_params) if inclusions_params.present?
    params.merge!(sort: sort_params) if sort_params.present?
    params.merge!(filters: filter_params) if filter_params.present?
    params
  end

  def sort_params
    @sort_params ||= params.fetch(:sort, '').split(',').each_with_object({}) do |token, result|
      direction = token.start_with?('-') && token.slice!(0) ? :desc : :asc
      result[token] = direction
    end.symbolize_keys
  end

  def inclusions_params
    # FIXME: rewrite it to make more readable
    @inclusions_params ||= params.fetch(:include, '')
                                 .split(',').map(&:underscore)
                                 .map do |inclusion_name|
                                   extract_nested_inclusions(inclusion_name)
                                 end
  end

  def extract_nested_inclusions(inclusion_name)
    nested_names = inclusion_name.split('.')
    last_name = nested_names.pop
    return last_name.to_sym if nested_names.empty?

    root_element = {}
    nested_names.each_with_index.reduce(root_element) do |res, obj_with_index|
      name, index = obj_with_index
      res[name] = index < nested_names.size - 1 ? {} : last_name
      res.symbolize_keys
    end
    root_element
  end

  # rubocop:disable Lint/ShadowedArgument
  def filter_params
    @filter_params ||= params.fetch(:filters, '').split(',').each_with_object({}) do |(key, value), res|
      key, value = key.split('.')
      res[key] = value
    end
  end
  # rubocop:enable Lint/ShadowedArgument
end
