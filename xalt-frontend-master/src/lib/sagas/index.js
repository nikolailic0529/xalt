import { fork, all } from 'redux-saga/effects';

import authSaga from './AuthSaga';
import profileSaga from './ProfileSaga';
import domainsSaga from './DomainsSaga';
import subscriptionsSaga from './SubscriptionsSaga';
import NotificationSaga from './NotificationSaga';
import coachesSaga from './CoachesSaga';
import coachProfilesSaga from './CoachProfilesSaga';
import homeworksSaga from './HomeworksSaga';
import membersSaga from './MembersSaga';
import exercisesSaga from './ExercisesSaga';
import challengesSaga from './ChallengesSaga'
import meetingsSaga from './MeetingsSaga';
import programsSaga from './ProgramsSaga';
import memberProfileSaga from './MemberProfileSaga';
import reportsSaga from './ReportsSaga';
import messagesSaga from './MessagesSaga';
import widgetSaga from './WidgetSaga';
import notificationsSaga from './NotificationsSaga';
import documentsSaga from './DocumentsSaga';
import countriesSaga from './CountriesSaga';
import contactUsSaga from './ContactUsSaga';
import memberQuestionAnswersSaga from './MemberQuestionAnswersSaga';
import memberCRFSaga from './MemberCRFSaga';
import memberRecommendationSaga from './MemberRecommendationSaga';
import measurementsSaga from './MeasurementsSaga';

export default function* root() {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(domainsSaga),
    fork(subscriptionsSaga),
    fork(NotificationSaga),
    fork(coachesSaga),
    fork(coachProfilesSaga),
    fork(homeworksSaga),
    fork(membersSaga),
    fork(exercisesSaga),
    fork(challengesSaga),
    fork(meetingsSaga),
    fork(programsSaga),
    fork(memberProfileSaga),
    fork(reportsSaga),
    fork(messagesSaga),
    fork(widgetSaga),
    fork(notificationsSaga),
    fork(documentsSaga),
    fork(countriesSaga),
    fork(contactUsSaga),
    fork(memberQuestionAnswersSaga),
    fork(memberCRFSaga),
    fork(memberRecommendationSaga),
    fork(measurementsSaga),
  ]);
}
