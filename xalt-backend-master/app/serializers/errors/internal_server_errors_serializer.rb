# frozen_string_literal: true

class Errors::InternalServerErrorsSerializer < Core::BaseInput
  attribute :exception

  def as_json
    {
      errors: [{
        status: 422,
        code:   :unprocessable_entity,
        title:  'Error in request processing',
        detail: exception.message,
        fields: exception.respond_to?(:fields) ? exception.fields : {}
      }]
    }
  end
end
