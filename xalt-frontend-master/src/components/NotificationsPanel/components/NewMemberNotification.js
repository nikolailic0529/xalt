import React from 'react';
import Text from 'components/shared/Text';
import BaseNotification from './BaseNotification';
import useLink from 'components/NotificationsPanel/useLink';

export default ({
  notification: {
    created_at: createdAt,
    additional_info: {
      member_profile_id: memberProfileId,
      member_name: memberName,
    },
  },
}) => {
  const link = useLink();

  return (
    <BaseNotification
      createdAt={createdAt}
      icon="newMemberNotification"
      content={(
        <>
          <Text darkPink smallSize medium clickable onClick={() => link(`/member-profile/${memberProfileId}`)}>{memberName}</Text>
          {' '}
          has chosen you to be a coach!
        </>
    )}
    />
  );
};
