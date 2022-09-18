import { combineReducers } from 'redux';

import { reducer as authReducer } from './auth';
import { reducer as profileReducer } from './profile';
import { reducer as domainsReducer } from './domains';
import { reducer as subscriptionsReducer } from './subscriptions';
import { reducer as notificationReducer } from './notification';
import { reducer as coachesReducer } from './coaches';
import { reducer as coachProfilesReducer } from './coach_profiles';
import { reducer as homeworksReducer } from './homeworks';
import { reducer as membersReducer } from './members';
import { reducer as exercisesReducer } from './exercises';
import { reducer as challengesReducer } from './challenges'
import { reducer as meetingsReducer } from './meetings';
import { reducer as programsReducer } from './programs';
import { reducer as memberProfileReducer } from './member_profile';
import { reducer as reportsReducer } from './reports';
import { reducer as messagesReducer } from './messages';
import { reducer as widgetReducer } from './widget';
import { reducer as notificationsReducer } from './notifications';
import { reducer as documentsReducer } from './documents';
import { reducer as countriesReducer } from './countries';
import { reducer as contactUsReducer } from './contact_us';
import { reducer as modalsReducer } from './modals';
import { reducer as memberQuestionAnswers } from './member_question_answers';
import { reducer as memberCRFs } from './member_crf';
import { reducer as memberRecommendations } from './member_recommendations';
import { reducer as measurementsReducer } from './measurements';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  domains: domainsReducer,
  subscriptions: subscriptionsReducer,
  notification: notificationReducer,
  coaches: coachesReducer,
  coach_profiles: coachProfilesReducer,
  homeworks: homeworksReducer,
  members: membersReducer,
  member_profile: memberProfileReducer,
  exercises: exercisesReducer,
  challenges: challengesReducer,
  meetings: meetingsReducer,
  programs: programsReducer,
  notifications: notificationsReducer,
  reports: reportsReducer,
  messages: messagesReducer,
  widget: widgetReducer,
  documents: documentsReducer,
  countries: countriesReducer,
  contactUs: contactUsReducer,
  modals: modalsReducer,
  member_question_answers: memberQuestionAnswers,
  member_crfs: memberCRFs,
  member_recommendations: memberRecommendations,
  measurements: measurementsReducer,
});

export default rootReducer;
