# frozen_string_literal: true

class Members::MemberCrfSerializer < ActiveModel::Serializer
  type :members_crf
  attributes :id, :sex, :age, :wc, :rhr, :pa, :crf

  belongs_to :user, serializer: ::UsersSerializer
end
