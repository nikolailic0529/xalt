import React from 'react';
import { useHistory } from 'react-router-dom';

import { formatDate } from 'lib/datetime';
import styled from 'styled-components';

import SvgIcon from 'components/shared/SvgIcon';
import { CoachDetails } from 'components/shared/CoachList';
import { theme } from 'components';
import {
  SessionItem,
  SessionItemDate,
  SessionItemTime,
  SessionItemMember,
  SessionItemL,
  UserPicDescr,
} from 'components/shared/Dashboard';
import moment from 'moment';

const ReportWrapper = styled.span`
  display: inline-block;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  margin: 0 0 0 8px;
  padding: 4px 0;
`;

export default ({ session, lastSession }) => {
  const date = session?.time_from && session.time_from;
  const name = session?.member_profile?.user?.name
    ? session.member_profile.user.name
    : null;
  const avatar = session?.member_profile?.user?.avatar;

  const history = useHistory();

  const redirect = () => {
    if (session?.report?.id) {
      if (session?.report?.is_filled) {
        history.push(`/reports/view/${session.report.id}`);
      } else {
        history.push(`/reports/edit/${session.report.id}`);
      }
    }
  };

  return (
    <SessionItem>
      <SessionItemL>
        <SessionItemDate>
          <SvgIcon
            name="navCalendar"
            width="24px"
            height="24px"
            fill="transparent"
            stroke={theme.colors.kingfisherDaisy}
          />
          {formatDate(date)}
        </SessionItemDate>
        <SessionItemTime>{moment(date).format('hh:mm A')}</SessionItemTime>
      </SessionItemL>
      {name && (
        <SessionItemMember
          maxWidth={
            lastSession
              ? ['100%', 'calc(100% - 332px)']
              : ['100%', 'calc(100% - 258px)']
          }
          width="100%"
        >
          <UserPicDescr avatar={avatar} imgSize="28px" name={name} />
        </SessionItemMember>
      )}
      {lastSession && (
        <ReportWrapper onClick={redirect}>
          <CoachDetails bigFont>report</CoachDetails>
        </ReportWrapper>
      )}
    </SessionItem>
  );
};
