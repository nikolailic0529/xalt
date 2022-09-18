import React from 'react';
import {
  HeadSession,
  NothingBlock,
  MainSession,
  HeadFirstDateMonth as HeadSessionHeader,
} from 'components/shared/Dashboard';

import SessionListItem from 'components/shared/DashboardSessions/SessionListItem';

const LastSessions = (props) => {
  const { meetings } = props;
  return (
    <>
      <HeadSession>
        <HeadSessionHeader>LAST SESSIONS</HeadSessionHeader>
      </HeadSession>
      <MainSession>
        {meetings.length > 0 ? (
          meetings.map((meeting, key) => (
            <SessionListItem key={key} session={meeting} lastSession={true} />
          ))
        ) : (
          <NothingBlock
            iconName="dashboardNoSession"
            iconWidth="49px"
            iconHeight="59px"
          >
            You don't have past sessions yet
          </NothingBlock>
        )}
      </MainSession>
    </>
  );
};

export default LastSessions;
