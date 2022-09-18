# frozen_string_literal: true

module Users
  class ContactUs < Core::BaseCommand
    attribute :email, String
    attribute :message, String
    attribute :full_name, String

    validates :email, :message, :full_name, presence: true

    include Core::BaseValidator

    def authorized?
      true
    end

    def process
      send_email
    end

    def broadcast_ok
      broadcast(:ok)
    end

    protected

    def send_email
      SendEmailJob.perform_later(updated_attributes.merge!(type: 'send_contact_us'))
    end
  end
end
