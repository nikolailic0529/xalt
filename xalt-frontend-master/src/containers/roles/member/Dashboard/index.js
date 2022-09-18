import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import InnerLink from 'components/shared/InnerLink';
import Calendar from 'components/shared/Calendar';
import CRFCard from 'components/shared/CRFCard';
import RecommendationCard from 'components/shared/RecommendationCard';
import HomeworksActions from 'lib/redux/reducers/homeworks';
import WidgetActions from 'lib/redux/reducers/widget';
import NextMeetWidget from 'components/shared/NextMeetWidget';
import MeetingsActions from 'lib/redux/reducers/meetings';
import ReportsActions from 'lib/redux/reducers/reports';
import CoachProfilesActions from 'lib/redux/reducers/coach_profiles';
import ChallengesActions from 'lib/redux/reducers/challenges'

import {
  DashboardWrapper,
  DashboardWrapperLayoutItem,
  DashboardLayoutItem,
  DashboardCard,
  CoachPicDescr,
} from 'components/shared/Dashboard';
import moment from 'moment';

import Rechart from 'components/shared/Rechart';
import QuestionaireAnswers from '../Questionaires/Answers';

const Dashboard = (props) => {
  const {
    homeworks,
    meetings,
    getHomeworksRequest,
    getWidgetRequest,
    memberId,
    answers,
    reportQuestions,
    getMeetingsRequest,
    getReportQuestionsRequest,
    getCoachProfilesRequest,
    coachId,
    coachProfile,
    isAuthorized,
    isSubscribed,
  } = props;

  const data = answers
    ? answers.map((item) => ({
        value: item.score,
        title: item.date ? moment(item.date).format('DD MMM') : 'No Date',
      }))
    : [];
  const timeFrom = null;
  const timeTo = null;

  useEffect(() => {
    getMeetingsRequest(timeFrom, timeTo, false);
    getWidgetRequest();
    getHomeworksRequest(memberId, timeFrom, timeTo);
    getReportQuestionsRequest();
  }, []);

  useEffect(() => {
    if (coachId) {
      getCoachProfilesRequest(coachId);
    }
  }, [coachId]);

  return (
    <>
      <DashboardWrapper alignItems="flex-start" mt={0} mb={2}>
        <DashboardWrapperLayoutItem flexDirection="column" width={['100%', null, null, 384]}>
          {coachId && coachProfile && (
            <DashboardLayoutItem width="100%">
              <DashboardCard bg="rgb(230 68 125 / 3%)" pl={3} pr={3} pt={2} pb={2}>
                <CoachPicDescr
                  avatar={coachProfile.user?.avatar}
                  imgSize="64px"
                  name={coachProfile.user?.name}
                />
              </DashboardCard>
            </DashboardLayoutItem>
          )}

          <DashboardLayoutItem width="100%">
            <NextMeetWidget
              meetings={meetings
                .filter(({ is_finished, member_profile_id }) => is_finished === false)
                .reverse()}
            />
          </DashboardLayoutItem>
          <DashboardLayoutItem width="100%">
            <InnerLink to="/homework">
              <Calendar
                fullscreen={false}
                homeworks={homeworks || []}
                setCurrentDate={() => {}}
                isDashboard
                getItemsRequest={getHomeworksRequest}
                m={0}
                isAuthorized={isAuthorized}
              />
            </InnerLink>
          </DashboardLayoutItem>
          <DashboardLayoutItem width="100%">{isSubscribed && <CRFCard />}</DashboardLayoutItem>
        </DashboardWrapperLayoutItem>
        <DashboardWrapperLayoutItem width={['100%', null, null, 'calc(100% - 384px)']}>
          <DashboardLayoutItem width="100%">
            <Rechart
              getWidgetRequest={getWidgetRequest}
              memberId={memberId}
              data={data}
              questions={reportQuestions}
              coachId={coachId}
            />
          </DashboardLayoutItem>
        </DashboardWrapperLayoutItem>
      </DashboardWrapper>
      {isSubscribed && (
        <DashboardWrapper alignItems="flex-start" mt={0} mb={2}>
          <DashboardWrapperLayoutItem width={['100%']}>
            <DashboardLayoutItem width="100%">
              <RecommendationCard />
            </DashboardLayoutItem>
          </DashboardWrapperLayoutItem>
        </DashboardWrapper>
      )}
      <DashboardWrapper alignItems="flex-start" mt={0}>
        <DashboardWrapperLayoutItem width={['100%']}>
          <DashboardLayoutItem width="100%">
            <QuestionaireAnswers />
          </DashboardLayoutItem>
        </DashboardWrapperLayoutItem>
      </DashboardWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  homeworks: state.member_profile.member_profile.programs,
  meetings: state.meetings.meetings,
  name: state.member_profile.member_profile?.user?.name,
  answers: state.widget.widget.condition_assessment_by_member,
  reportQuestions: state.reports.report_questions,
  coachId: state.profile.member_profile?.coach_profile_id,
  coachProfile: state.coach_profiles.coach_profiles,
  memberId: state.profile.member_profile?.id,
  isAuthorized: state.profile.id,
  isSubscribed:
    true ||
    (state.profile.role === 'member' &&
      ((state.auth.stripe && state.auth.stripe.stripe_subscription_status === 'active') ||
        (state.profile.stripe && state.profile.stripe.stripe_subscription_status === 'active'))) ||
    (state.profile.role === 'coach' &&
      (state.auth.stripe || state.profile.stripe) &&
      ((state.auth.stripe && state.auth.stripe.stripe_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_id) ||
        (state.auth.stripe && state.auth.stripe.stripe_bank_account_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_bank_account_id))),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getCoachProfilesRequest: (id) => dispatch(CoachProfilesActions.getCoachProfilesRequest(id)),
  getMeetingsRequest: (time_from, time_to, pagination) =>
    dispatch(MeetingsActions.getMeetingsRequest(time_from, time_to, pagination)),
  getHomeworksRequest: (id, time_from, time_to) =>
    dispatch(HomeworksActions.getHomeworksRequest(id, time_from, time_to)),
  getWidgetRequest: (widgetNames, filters) =>
    dispatch(WidgetActions.getWidgetRequest(widgetNames, filters)),
  getReportQuestionsRequest: () => dispatch(ReportsActions.getReportQuestionsRequest()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
