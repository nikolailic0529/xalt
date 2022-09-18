import React from 'react';
import Text from 'components/shared/Text';
import useLink from 'components/NotificationsPanel/useLink';
import BaseNotification from './BaseNotification';

export default ({
  notification: {
    created_at: createdAt,
    additional_info: { homework_id: homeworkId },
  },
}) => {
  const link = useLink();

  return (
    <BaseNotification
      createdAt={createdAt}
      icon="todayHomeworkNotification"
      content={
        <>
          You have{' '}
          <Text darkPink smallSize medium clickable onClick={() => link(`/homework/${homeworkId}`)}>
            action
          </Text>{' '}
          for today!
          <br />
          Don't forget to do it!
        </>
      }
    />
  );
};
