import React from 'react';
import Text from 'components/shared/Text';
import moment from 'moment';
import useLink from 'components/NotificationsPanel/useLink';
import BaseNotification from './BaseNotification';

export default ({
  notification: {
    created_at: createdAt,
    additional_info: { member_profile_id: memberProfileId, member_name: memberName, date },
  },
}) => {
  const link = useLink();

  return (
    <BaseNotification
      createdAt={createdAt}
      icon="newHomeworkNotification"
      content={
        <>
          <Text
            darkPink
            smallSize
            medium
            clickable
            onClick={() => link(`/member-profile/${memberProfileId}`)}
          >
            {memberName}
          </Text>{' '}
          completed action for{' '}
          <Text darkPink smallSize medium>
            {moment(date).format('MMM DD')}
          </Text>
        </>
      }
    />
  );
};
