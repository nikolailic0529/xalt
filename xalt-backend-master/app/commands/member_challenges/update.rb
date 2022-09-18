# frozen_string_literal: true

module MemberChallenges
  class Update < Core::BaseCommand
    attribute :member_challenge,     MemberChallenge
    attribute :current_user,         User
    attribute :name,                 String
    attribute :description,          String
    attribute :category,             String
    attribute :incentives,           String
    attribute :video_url,            String
    attribute :schedule,             String
    attribute :corporate_tag, String
    attribute :start,                DateTime
    attribute :end,                  DateTime
    attribute :is_competition,       Virtus::JsonapiBooleanFilterAttributes
    attribute :is_private,           Virtus::JsonapiBooleanFilterAttributes

    validates :name, presence: true
    validates :description, presence: true
    validates :category, presence: true
    validates :start, presence: true
    validates :end, presence: true

    validates :category, inclusion: {in: MemberChallenge::CATEGORIES}
    include Core::BaseValidator

    def authorized?
      current_user.member? || current_user.admin?
    end

    def process
      update_member_challenge
      member_challenge.reload
    end

    def broadcast_ok
      broadcast(:ok, member_challenge)
    end

    protected

    def update_member_challenge
      member_challenge.update!(params)
    end

    def params
      updated_attributes.except!(:current_user, :member_challenge)
    end
  end
end
