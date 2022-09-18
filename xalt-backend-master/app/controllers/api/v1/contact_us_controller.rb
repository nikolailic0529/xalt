# frozen_string_literal: true

class Api::V1::ContactUsController < ApplicationController
  def contact_us
    run_command!(Users::ContactUs, params)

    render(json: {}, status: :ok)
  end
end
