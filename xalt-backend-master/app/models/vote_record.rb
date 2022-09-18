# frozen_string_literal: true

class VoteRecord < ApplicationRecord
  belongs_to :user
  belongs_to :exercise
end
