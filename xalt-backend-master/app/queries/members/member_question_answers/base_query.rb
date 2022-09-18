# frozen_string_literal: true

module Members
  module MemberQuestionAnswers
    class BaseQuery < Core::BaseQuery
      attribute :current_user, User

      def base_relation
        return MemberQuestionAnswer.all if current_user.admin? || current_user.coach?
        return MemberQuestionAnswer.where(user_id: current_user.id) if current_user.member?

        MemberQuestionAnswer.none
      end
    end
  end
end
