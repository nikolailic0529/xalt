# frozen_string_literal: true

class SendEmailJob < Core::BaseJob
  queue_as :mailers

  def perform(params)
    UserMailer.send_contact_us(params).deliver if params[:type] == 'send_contact_us'
  end
end
