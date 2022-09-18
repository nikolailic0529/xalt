# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  before_create :skip_confirmation! if Rails.env.test? || Rails.env.development?
  before_validation :set_provider
  before_validation :set_uid
  after_create :init_email_settings

  # Include default devise modules.
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable, :confirmable
  # :registerable

  mount_uploader :avatar, AvatarUploader

  # PG_Search
  include PgSearch::Model

  multisearchable against: %i[name]
  pg_search_scope :search, against: %i[name], using: {tsearch: {prefix: true}}

  # Unread
  acts_as_reader

  GENDER = %w[male female].freeze
  ROLES = %w[member coach admin].freeze
  COACH_NOTIFICATION_LIST = %w[member_completed_homework new_member expired_report upcoming_meeting].freeze
  MEMBER_NOTIFICATION_LIST = %w[new_homework new_meeting today_homework upcoming_meeting].freeze

  has_one :coach_profile
  has_many :members, through: :coach_profile

  has_one :member_profile
  has_one :member_question_answer
  has_many :member_crf
  has_many :exercises
  has_many :member_challenges
  has_many :user_member_challenges
  has_many :user_member_challenge_check_ins
  has_many :vote_record

  has_many :conversation_users
  has_many :conversations, through: :conversation_users

  has_many :notifications

  ROLES.each do |role|
    define_method("#{role}?") do
      self.role == role
    end
  end

  protected

  def set_provider
    self[:provider] = 'email' if self[:provider].blank?
  end

  def set_uid
    self[:uid] = self[:email] if self[:uid].blank? && self[:email].present?
  end

  def init_email_settings
    self[:email_notifications_settings] = email_settings_params[:coach] if coach?
    self[:email_notifications_settings] = email_settings_params[:member] if member?
    save
  end

  def email_settings_params
    {
      coach:  {
        member_completed_homework: true,
        new_member:                true,
        expired_report:            true,
        upcoming_meeting:          true
      },
      member: {
        new_homework:     true,
        new_meeting:      true,
        today_homework:   true,
        upcoming_meeting: true
      }
    }
  end
end
