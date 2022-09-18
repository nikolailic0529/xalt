# frozen_string_literal: true

class BaseController < ActionController::API
  # def respond_with(status:, resp:)
  #   render json: resp, status: status
  # end
  #
  # def respond_200(message=nil, serializer: nil, each_serializer: nil)
  #   render json: message || {message: 'Success'}, status: :ok, serializer: serializer, each_serializer: each_serializer
  # end
  #
  # def respond_400(error='Error')
  #   render json: {error: error}, status: :bad_request
  # end
  #
  # def respond_401(error='Unauthorized')
  #   render json: {error: error}, status: :unauthorized
  # end
  #
  # def respond_403(error='Forbidden')
  #   render json: {error: error}, status: :forbidden
  # end
  #
  # def respond_422(error='Unprocessable Entity')
  #   render json: {error: error}, status: :unprocessable_entity
  # end
  #
  # def respond_404(error='Not Found')
  #   render json: {error: error}, status: :not_found
  # end
end
