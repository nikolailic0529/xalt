import React from 'react';
import Text from 'components/shared/Text';
import BaseNotification from './BaseNotification';
import useLink from 'components/NotificationsPanel/useLink';

export default ({
  notification: {
    created_at: createdAt,
    additional_info: { coach_profile_id: coachProfileId },
  },
}) => {
  const link = useLink();

  return (
    <BaseNotification
      createdAt={createdAt}
      icon="newHomeworkNotification"
      content={
        <>
          Your{' '}
          <Text darkPink smallSize medium onClick={() => link(`/coach/${coachProfileId}`)}>
            coach
          </Text>{' '}
          added a new action
        </>
      }
    />
  );
};
