# frozen_string_literal: true

class ReportQuestion < ApplicationRecord
  ANSWERS = %w[yes no some_of_it].freeze

  has_many :reports
  has_many :report_answers
end
