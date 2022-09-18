# frozen_string_literal: true

class MemberFitnesDomain < ApplicationRecord
  belongs_to :fitnes_domain
  belongs_to :member_profile
end
