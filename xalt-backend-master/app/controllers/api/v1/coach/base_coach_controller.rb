# frozen_string_literal: true

class Api::V1::Coach::BaseCoachController < AuthenticatedController
  before_action :authorized_coach?

  def authorized_coach?
    return render(json: {error: 'Access denied'}, status: :forbidden) unless current_user.admin? || current_user.coach?
  end
end
