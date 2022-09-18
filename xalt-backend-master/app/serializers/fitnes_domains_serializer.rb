# frozen_string_literal: true

class FitnesDomainsSerializer < ActiveModel::Serializer
  type :fitnes_domains
  attributes :id, :name, :coach_domain_name, :member_goal_name
end
