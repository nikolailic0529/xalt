# frozen_string_literal: true

class Api::V1::FitnesDomainsController < AuthenticatedController
  def index
    fitnes_domains = find_fitnes_domains_query

    render(json: fitnes_domains, each_serializer: FitnesDomainsSerializer, status: :ok)
  end

  private

  def find_fitnes_domains_query
    FitnesDomains::BaseQuery.call(params_with_current_user)
  end
end
