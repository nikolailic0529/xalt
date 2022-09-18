import React, { useEffect } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { MainWrapper } from 'components/shared/Layout';
import {
  MemberProfileWrapper,
  MemberProfileLayoutItem,
  MemberProfileInfo,
  MemberProfileTabs,
  MemberInfo,
  MemberSubscriptions,
  MemberInfoWrapper,
  MemberProfileInfoWrapper,
  UserPic,
} from 'components/shared/MemberProfile';
import ButtonAux from 'components/shared/ButtonAux';
import TabPanel from 'components/shared/TabPanel';
import image from 'assets/icons/empty-user-profile.svg';
import MemberProfileActions from 'lib/redux/reducers/member_profile';
import MeetingsActions from 'lib/redux/reducers/meetings';
import ReportsActions from 'lib/redux/reducers/reports';
import Dashboard from './dashboard';
import Homework from './homework';
import Program from './program';
import Reports from './reports';
import Infos from './infos';
import Measurements from './Measurements';

const MemberProfile = (props) => {
  const {
    getMemberProfileRequest,
    getReportQuestionsRequest,
    member_profile,
    getMeetingsRequest,
    getReportsRequest,
    coach_profile_id,
  } = props;
  const memberId = props?.match?.params?.id;
  const history = useHistory();

  useEffect(() => {
    if (coach_profile_id) {
      getMemberProfileRequest(memberId);
      getReportQuestionsRequest();
    }
  }, []);

  return (
    <MainWrapper>
      <MemberProfileWrapper>
        <MemberProfileLayoutItem>
          <MemberProfileInfo>
            <MemberInfoWrapper>
              <MemberProfileInfoWrapper>
                {member_profile?.user?.avatar?.url ? (
                  <UserPic
                    width={70}
                    height={70}
                    backgroundImage={`url(${member_profile?.user?.avatar?.url})`}
                  />
                ) : (
                  <UserPic width={70} height={70} backgroundImage={`url(${image})`} />
                )}
              </MemberProfileInfoWrapper>
              <MemberProfileInfoWrapper>
                <MemberInfo fontWeight="bold">{member_profile?.user?.name}</MemberInfo>
              </MemberProfileInfoWrapper>
              <MemberProfileInfoWrapper>
                <MemberSubscriptions>
                  <MemberInfo>
                    {member_profile && member_profile.subscription
                      ? member_profile.subscription.description
                      : ''}
                  </MemberInfo>
                  <MemberInfo>
                    {member_profile && member_profile.subscription
                      ? member_profile.subscription.sessions_count
                      : '0'}{' '}
                    times month
                  </MemberInfo>
                </MemberSubscriptions>
              </MemberProfileInfoWrapper>
            </MemberInfoWrapper>
            <ButtonAux onClick={() => history.push('/messages')} pinkBtn>
              Message
            </ButtonAux>
          </MemberProfileInfo>
        </MemberProfileLayoutItem>
        <MemberProfileLayoutItem>
          <MemberProfileTabs>
            <TabPanel
              tabs={[
                {
                  title: 'dashboard',
                  component: <Dashboard memberId={memberId} />,
                  onClick: () => {
                    getMemberProfileRequest(memberId);
                    getReportQuestionsRequest();
                  },
                },
                {
                  title: 'action',
                  component: <Homework memberId={memberId} />,
                  onClick: () => {},
                },
                {
                  title: 'program',
                  component: <Program memberId={memberId} />,
                  onClick: () => {
                    getMeetingsRequest(null, null, false);
                  },
                },
                {
                  title: 'reports',
                  component: <Reports memberId={member_profile.user?.id || memberId} />,
                  onClick: R.identity,
                },
                {
                  title: 'goals',
                  component: <Infos />,
                  onClick: () => {},
                },
                {
                  title: 'measurements',
                  component: <Measurements />,
                  onClick: () => {},
                },
              ]}
            />
          </MemberProfileTabs>
        </MemberProfileLayoutItem>
      </MemberProfileWrapper>
    </MainWrapper>
  );
};

const mapStateToProps = (state) => ({
  member_profile: state.member_profile.member_profile,
  coach_profile_id: state.profile.coach_profile?.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMemberProfileRequest: (id) => dispatch(MemberProfileActions.getMemberProfileRequest(id)),
  getMeetingsRequest: (time_from, time_to, pagination) =>
    dispatch(MeetingsActions.getMeetingsRequest(time_from, time_to, pagination)),
  getReportsRequest: (filters) => dispatch(ReportsActions.getReportsRequest(filters)),
  getReportQuestionsRequest: () => dispatch(ReportsActions.getReportQuestionsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberProfile);
