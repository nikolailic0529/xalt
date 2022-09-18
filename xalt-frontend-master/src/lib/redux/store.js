import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'lib/redux/reducers';
import rootSaga from 'lib/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

import { INITIAL_STATE as authInitialState } from './reducers/auth';
import { INITIAL_STATE as profileInitialState } from './reducers/profile';
import { INITIAL_STATE as domainsInitialState } from './reducers/domains';
import { INITIAL_STATE as subscriptionsInitialState } from './reducers/subscriptions';
import { INITIAL_STATE as notificationInitialState } from './reducers/notification';
import { INITIAL_STATE as coachesInitialState } from './reducers/coaches';
import { INITIAL_STATE as coachProfilesInitialState } from './reducers/coach_profiles';
import { INITIAL_STATE as homeworksInitialState } from './reducers/homeworks';
import { INITIAL_STATE as membersInitialState } from './reducers/members';
import { INITIAL_STATE as exercisesInitialState } from './reducers/exercises';
import { INITIAL_STATE as challengesInitialState } from './reducers/challenges';
import { INITIAL_STATE as meetingsInitialState } from './reducers/meetings';
import { INITIAL_STATE as programsInitialState } from './reducers/programs';
import { INITIAL_STATE as memberProfileInitialState } from './reducers/member_profile';
import { INITIAL_STATE as reportsInitialState } from './reducers/reports';
import { INITIAL_STATE as messagesInitialState } from './reducers/messages';
import { INITIAL_STATE as widgetInitialState } from './reducers/widget';
import { INITIAL_STATE as notificationsInitialState } from './reducers/notifications';
import { INITIAL_STATE as documentsInitialState } from './reducers/documents';
import { INITIAL_STATE as countriesInitialState } from './reducers/countries';
import { INITIAL_STATE as contactUsInitialState } from './reducers/contact_us';
import { INITIAL_STATE as modalsInitialState } from './reducers/modals';
import { INITIAL_STATE as memberQuestionAnswersInitialState } from './reducers/member_question_answers';
import { INITIAL_STATE as memberCRFsInitialState } from './reducers/member_crf';
import { INITIAL_STATE as memberRecommendationsInitialState } from './reducers/member_recommendations';
import { INITIAL_STATE as measurementsInitialState } from './reducers/measurements';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['notifications', 'messages', 'modals'],
};

const initialState = {
  auth: authInitialState,
  profile: profileInitialState,
  domains: domainsInitialState,
  subscriptions: subscriptionsInitialState,
  notification: notificationInitialState,
  coaches: coachesInitialState,
  coach_profiles: coachProfilesInitialState,
  homeworks: homeworksInitialState,
  members: membersInitialState,
  member_profile: memberProfileInitialState,
  exercises: exercisesInitialState,
  challenges: challengesInitialState,
  meetings: meetingsInitialState,
  programs: programsInitialState,
  notifications: notificationsInitialState,
  reports: reportsInitialState,
  messages: messagesInitialState,
  widget: widgetInitialState,
  documents: documentsInitialState,
  countries: countriesInitialState,
  contactUs: contactUsInitialState,
  modals: modalsInitialState,
  member_question_answers: memberQuestionAnswersInitialState,
  member_crfs: memberCRFsInitialState,
  member_recommendations: memberRecommendationsInitialState,
  measurements: measurementsInitialState,
};

const appReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    storage.removeItem('persist:root');
    return rootReducer(initialState, action);
  }

  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...[sagaMiddleware, logger])),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
