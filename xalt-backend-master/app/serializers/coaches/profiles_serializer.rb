# frozen_string_literal: true

class Coaches::ProfilesSerializer < ActiveModel::Serializer
  type :coaches_profiles

  attributes :id, :about, :social_network_links, :verified, :xalt_sertified, :earnings, :gender, :coach_intensity,
             :coach_mode, :coach_styles, :rate, :timezone, :training_since, :loves, :why_with_me_video, :coach_documents,
             :featured

  has_many :fitnes_domains, serializer: ::FitnesDomainsSerializer
  has_many :programs, serializer: ::ProgramsSerializer
  has_many :coach_documents, serializer: Coaches::DocumentsSerializer
  belongs_to :user, serializer: ::UsersSerializer

  def earnings
    object.earnings.round(2)
  end
end
