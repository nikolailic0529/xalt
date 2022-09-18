import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { CoachDetails } from 'components/shared/CoachList';
import {
  HeadSession,
  ViewDetailsWrapper,
  HeadWrapper,
  HeadFirstDate,
  UserPicDescr,
  NothingBlock,
  MainSession,
  UserPicDescrWrapper,
} from 'components/shared/Dashboard';

import ButtonAux from 'components/shared/ButtonAux';
import InnerLink from 'components/shared/InnerLink';
import MemberProfileActions from 'lib/redux/reducers/member_profile';

import SessionListItem from './SessionListItem';

const Sessions = (props) => {
  const { meetings, member_profile, getMemberProfileRequest } = props;
  const memberId = meetings[0]?.member_profile_id;
  useEffect(() => {
    if (memberId) {
      getMemberProfileRequest(memberId);
    }
  }, []);

  return (
    <>
      <HeadSession>
        {meetings?.length > 0 ? (
          <>
            <ViewDetailsWrapper>
              <CoachDetails bigFont to="/calendar">
                See details
              </CoachDetails>
            </ViewDetailsWrapper>
            <HeadWrapper>
              <HeadFirstDate meeting={meetings[0]} />
              <UserPicDescrWrapper>
                <UserPicDescr
                  avatar={meetings[0].member_profile?.user?.avatar}
                  imgSize="40px"
                  name={meetings[0].member_profile?.user?.name}
                  continuos={member_profile?.subscription?.type}
                />
                <a href={meetings[0].google_meet_url} target="_blank" rel="noreferrer">
                  <ButtonAux pinkBtn m="20px 0 0">
                    Join the session
                  </ButtonAux>
                </a>
              </UserPicDescrWrapper>
            </HeadWrapper>
          </>
        ) : (
          <NothingBlock iconName="dashboardCalendar" iconWidth="83px" iconHeight="62px">
            Calendar
          </NothingBlock>
        )}
      </HeadSession>
      <MainSession>
        {meetings.length > 0 ? (
          meetings.slice(1).map((meeting, key) => <SessionListItem key={key} session={meeting} />)
        ) : (
          <NothingBlock iconName="dashboardNoSession" iconWidth="49px" iconHeight="59px">
            You don't have upcoming sessions yet. You can schedule a meeting in your calendar
          </NothingBlock>
        )}
      </MainSession>
    </>
  );
};

const mapStateToProps = (state) => ({
  member_profile: state.member_profile.member_profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMemberProfileRequest: (id) => dispatch(MemberProfileActions.getMemberProfileRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
