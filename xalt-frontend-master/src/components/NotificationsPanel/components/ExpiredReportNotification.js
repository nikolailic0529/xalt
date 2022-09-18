import React from 'react';
import Text from 'components/shared/Text';
import BaseNotification from './BaseNotification';
import useLink from 'components/NotificationsPanel/useLink';

export default ({
  notification: {
    created_at: createdAt,
    additional_info: {
      report_id: reportId,
    },
  },
}) => {
  const link = useLink();

  return (
    <BaseNotification
      createdAt={createdAt}
      icon="expiredReportNotification"
      content={(
        <>
          You have unfilled
          {' '}
          <Text darkPink smallSize medium clickable onClick={() => link(`/reports/view/${reportId}`)}>report</Text>
          {' '}
          from yesterday
        </>
      )}
    />
  );
};
