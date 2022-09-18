# frozen_string_literal: true

class Report < ApplicationRecord
  has_many :report_report_question
  has_many :questions, through: :report_report_question, source: :report_question
  has_many :report_answers
  belongs_to :coach_profile
  belongs_to :member_profile
  belongs_to :meeting
end
