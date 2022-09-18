# frozen_string_literal: true

class SystemInfoController < ApplicationController
  def index
    render json: version_service, status: :ok
  end

  private

  def version_service
    {version: '0.0.1'}
  end
end
