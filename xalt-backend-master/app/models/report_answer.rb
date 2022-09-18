# frozen_string_literal: true

class ReportAnswer < ApplicationRecord
  belongs_to :report
  belongs_to :report_question
end
