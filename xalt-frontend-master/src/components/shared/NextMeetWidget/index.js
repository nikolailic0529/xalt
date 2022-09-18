import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { CoachDetails } from 'components/shared/CoachList';
import {
  HeadSession,
  ViewDetailsWrapper,
  HeadWrapper,
  HeadFirstDateWrapper,
  HeadFirstDateMonth,
  HeadFirstDateDay,
  HeadDescription,
  NothingBlock,
  HeadInfoWrapper,
  HeadInfo,
  HeadTimeWrapper,
} from 'components/shared/Dashboard';
import { DashboardHeader } from 'components/shared/MemberProfile';

import MemberProfileActions from 'lib/redux/reducers/member_profile';
import moment from 'moment';

const Sessions = (props) => {
  const { meetings, getMemberProfileRequest, match } = props;
  const memberId = match?.params?.id;
  useEffect(() => {
    if (memberId) {
      getMemberProfileRequest(memberId);
    }
  }, []);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const nextMeet = meetings.length ? meetings[0] : {};

  const firstDate =
    typeof nextMeet.time_from === 'string'
      ? new Date(nextMeet.time_from)
      : nextMeet.time_from;
  const date = firstDate ? firstDate.getDate() : '';
  const month = firstDate ? firstDate.getMonth() : '';

  return (
    <>
      <HeadSession
        padding="16px"
        borderRadius={20}
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.08)"
      >
        {meetings?.length > 0 ? (
          <>
            <ViewDetailsWrapper
              justifyContent="space-between"
              alignItems="baseline"
              flexDirection="row"
            >
              <DashboardHeader>Upcoming session</DashboardHeader>
              <CoachDetails bigFont to="/calendar">
                See details
              </CoachDetails>
            </ViewDetailsWrapper>
            <HeadWrapper>
              <HeadFirstDateWrapper isMemberScreen={true}>
                <HeadTimeWrapper>
                  <HeadInfoWrapper>
                    <HeadFirstDateMonth>{monthNames[month]}</HeadFirstDateMonth>
                    <HeadFirstDateDay>{`${date}th`}</HeadFirstDateDay>
                  </HeadInfoWrapper>
                  <HeadInfoWrapper>
                    <HeadInfo>{nextMeet?.program?.name}</HeadInfo>
                    <HeadInfo>
                      {`${moment(nextMeet.time_from).format('LT')} to ${moment(
                        nextMeet.time_to,
                      ).format('LT')}`}
                    </HeadInfo>
                  </HeadInfoWrapper>
                </HeadTimeWrapper>
                <HeadDescription>
                  {nextMeet.program?.description}
                </HeadDescription>
              </HeadFirstDateWrapper>
            </HeadWrapper>
          </>
        ) : (
          <NothingBlock
            iconName="dashboardCalendar"
            iconWidth="83px"
            iconHeight="62px"
          >
            Calendar
          </NothingBlock>
        )}
      </HeadSession>
    </>
  );
};

const mapStateToProps = (state) => ({
  member_profile: state.member_profile.member_profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMemberProfileRequest: (id) =>
    dispatch(MemberProfileActions.getMemberProfileRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
