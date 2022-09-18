import React from 'react';
import Text from 'components/shared/Text';
import moment from 'moment';
import BaseNotification from './BaseNotification';
import useLink from 'components/NotificationsPanel/useLink';

export default ({
  notification: {
    created_at: createdAt,
    additional_info: {
      coach_profile_id: coachProfileId,
      meeting_time: meetingTime,
    },
  },
}) => {
  const link = useLink();

  return (
    <BaseNotification
      createdAt={createdAt}
      icon="newMeetingNotification"
      content={(
        <>
          Your
          {' '}
          <Text darkPink smallSize medium clickable onClick={() => link(`/coach/${coachProfileId}`)}>coach</Text>
          {' '}
          scheduled a new meeting with you on
          {' '}
          <Text darkPink smallSize medium>{moment(meetingTime).format('MMM DD')}</Text>
        </>
    )}
    />
  );
};
