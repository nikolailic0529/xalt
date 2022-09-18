# frozen_string_literal: true

class Api::V1::Analytics::WidgetsController < AuthenticatedController
  def index
    data =
      widget_names_array.index_with do |widget_name|
        widget_class(widget_name)&.call(params_with_current_user)
      end

    render json: data, status: :ok
  end

  private

  def widget_names_array
    return [] if params[:widget_names].nil?

    params[:widget_names].split(',')
  end

  def widget_class(widget_name)
    "Analytics::Widgets::#{widget_name.camelize}".safe_constantize || Analytics::StubWidget
  end
end
