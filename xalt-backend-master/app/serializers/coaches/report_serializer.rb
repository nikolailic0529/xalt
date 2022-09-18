# frozen_string_literal: true

class Coaches::ReportSerializer < ActiveModel::Serializer
  type :reports

  attributes :id, :summary, :is_filled, :additional_comments, :created_at

  belongs_to :coach_profile, serializer: Coaches::ProfilesSerializer
  belongs_to :member_profile, serializer: Members::ProfilesSerializer
  belongs_to :meeting, serializer: ::MeetingsSerializer

  has_many :questions, serializer: Coaches::ReportQuestionSerializer
  has_many :report_answers, serializer: Coaches::ReportAnswerSerializer
end
