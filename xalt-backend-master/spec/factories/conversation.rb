# frozen_string_literal: true

FactoryBot.define do
  factory :conversation do
    users { [create(:user, :coach), create(:user, :member)] }
  end
end
