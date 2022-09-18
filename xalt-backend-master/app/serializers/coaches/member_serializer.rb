# frozen_string_literal: true

module Coach
  class MemberSerializer < ActiveModel::Serializer
    belongs_to :user
  end
end
