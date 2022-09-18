# frozen_string_literal: true

module MemberChallenges
  class Create < Core::BaseCommand
    attribute :current_user,         User
    attribute :name,                 String
    attribute :description,          String
    attribute :category,             String
    attribute :incentives,           String
    attribute :video_url,            String
    attribute :schedule,             String
    attribute :corporate_tag,        String
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

    attr_reader :member_challenge

    def authorized?
      current_user.member? || current_user.admin?
    end

    def process
      create_member_challenge
    end

    def broadcast_ok
      broadcast(:ok, member_challenge)
    end

    protected

    def create_member_challenge
      @member_challenge = current_user.member_challenges.create!(params)
    end

    def params
      updated_attributes.except!(:current_user)
    end
  end
end
