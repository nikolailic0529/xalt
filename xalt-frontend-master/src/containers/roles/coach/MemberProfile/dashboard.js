import React from 'react';
import { connect } from 'react-redux';

import Calendar from 'components/shared/Calendar';
import HomeworksActions from 'lib/redux/reducers/homeworks';
import WidgetActions from 'lib/redux/reducers/widget';
import NextMeetWidget from 'components/shared/NextMeetWidget';

import {
  DashboardWrapper,
  DashboardWrapperLayoutItem,
  DashboardLayoutItem,
} from 'components/shared/Dashboard';
import QuestionaireAnswers from 'containers/roles/member/Questionaires/Answers';
import CRFCard from 'components/shared/CRFCard';
import RecommendationCard from 'components/shared/RecommendationCard';

import Rechart from 'components/shared/Rechart';
import moment from 'moment';

const Dashboard = (props) => {
  const {
    homeworks,
    meetings,
    getHomeworksRequest,
    getWidgetRequest,
    memberId,
    answers,
    reportQuestions,
    coachId,
    isAuthorized,
  } = props;

  const data = answers
    ? answers.map((item) => ({
        value: item.score,
        title: item.date ? moment(item.date).format('DD MMM') : 'No Date',
      }))
    : [];

  return (
    <>
      <DashboardWrapper alignItems="flex-start" mt={3}>
        <DashboardWrapperLayoutItem flexDirection="column" width={['100%', null, null, 384]}>
          <DashboardLayoutItem width="100%">
            <NextMeetWidget
              meetings={meetings
                .filter(
                  ({ is_finished, member_profile_id }) =>
                    is_finished === false && member_profile_id === memberId,
                )
                .reverse()}
            />
          </DashboardLayoutItem>
          <DashboardLayoutItem width="100%">
            <Calendar
              fullscreen={false}
              homeworks={homeworks || []}
              setCurrentDate={() => {}}
              isDashboard
              getItemsRequest={getHomeworksRequest}
              memberId={memberId}
              m={0}
              isAuthorized={isAuthorized}
            />
          </DashboardLayoutItem>
          <DashboardLayoutItem width="100%">
            <CRFCard memberId={memberId} />
          </DashboardLayoutItem>
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
      <DashboardWrapper alignItems="flex-start" mt={0} mb={2}>
        <DashboardWrapperLayoutItem width={['100%']}>
          <DashboardLayoutItem width="100%">
            <RecommendationCard memberId={memberId} />
          </DashboardLayoutItem>
        </DashboardWrapperLayoutItem>
      </DashboardWrapper>
      <DashboardWrapper alignItems="flex-start" mt={0}>
        <DashboardWrapperLayoutItem width={['100%']}>
          <DashboardLayoutItem width="100%">
            <QuestionaireAnswers memberId={memberId} />
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
  coachId: state.profile.coach_profile?.id,
  isAuthorized: state.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getHomeworksRequest: (id, time_from, time_to) =>
    dispatch(HomeworksActions.getHomeworksRequest(id, time_from, time_to)),
  getWidgetRequest: (widgetNames, filters) =>
    dispatch(WidgetActions.getWidgetRequest(widgetNames, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
