# frozen_string_literal: true

class CreateBillingRecordJob < Core::BaseJob
  queue_as :meetings

  # rubocop:disable Metrics/AbcSize
  def perform(params)
    meeting = Meeting.eager_load(:coach_profile, {member_profile: :subscription}).find(params[:meeting_id])

    BillingRecord.transaction do
      BillingRecord.create!(
        meeting_id:        meeting.id,
        subscription_id:   meeting.member_profile.subscription.id,
        member_profile_id: meeting.member_profile.id,
        amount:            meeting.member_profile.subscription.amount_per_meeting,
        direction:         'outcoming'
      )

      BillingRecord.create!(
        meeting_id:       meeting.id,
        subscription_id:  meeting.member_profile.subscription.id,
        coach_profile_id: meeting.coach_profile.id,
        amount:           meeting.member_profile.subscription.amount_per_meeting,
        direction:        'incoming'
      )

      coach_profile = meeting.coach_profile
      coach_profile.earnings = coach_profile.earnings + meeting.member_profile.subscription.amount_per_meeting
      coach_profile.save!
    end
  end
  # rubocop:enable Metrics/AbcSize
end
