# frozen_string_literal: true

class MemberProfile < ApplicationRecord
  belongs_to :user
  belongs_to :subscription, optional: true

  belongs_to :coach_profile, class_name: 'CoachProfile', optional: true

  has_many :member_fitnes_domains
  has_many :fitnes_domains, through: :member_fitnes_domains
  has_many :reports
  has_many :meetings
  has_many :programs

  # has_many :daily_plans, class_name: 'DailyMemberPlan'
  # has_many :activities, class_name: 'MemberActivity'
  # has_many :homeworks
end
