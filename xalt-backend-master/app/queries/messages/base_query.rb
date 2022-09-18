# frozen_string_literal: true

module Messages
  class BaseQuery < Core::BaseQuery
    attribute :current_user, User

    def base_relation
      return Message.all if current_user.admin?

      if current_user.coach? || current_user.member?
        return Message.joins(conversation: :conversation_users)
                      .where(conversation: {conversation_users: {user_id: current_user.id}})
      end

      Message.none
    end
  end
end
