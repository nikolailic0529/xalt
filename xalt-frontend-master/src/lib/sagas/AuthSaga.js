import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';

import api from 'lib/api';
import authTypes from 'lib/redux/types/auth';
import profileTypes from 'lib/redux/types/profile';
import domainsTypes from 'lib/redux/types/domains';
import subscriptionsTypes from 'lib/redux/types/subscriptions';
import notificationTypes from 'lib/redux/types/notification';
import coachesTypes from 'lib/redux/types/coaches';
import homeworksTypes from 'lib/redux/types/homeworks';
import membersTypes from 'lib/redux/types/members';
import meetingsTypes from 'lib/redux/types/meetings';
import programsTypes from 'lib/redux/types/programs';
import exercisesTypes from 'lib/redux/types/exercises';
import challengesTypes from 'lib/redux/types/challenges'
import memberProfileTypes from 'lib/redux/types/member_profile';
import coachProfilesTypes from 'lib/redux/types/coach_profiles';
import messagesTypes from 'lib/redux/types/messages';
import notificationsTypes from 'lib/redux/types/notifications';
import reportsTypes from 'lib/redux/types/reports';
import widgetTypes from 'lib/redux/types/widget';
import countriesTypes from 'lib/redux/types/countries';
import errorHandler from 'utils/errorHandler';

import { getUserProfile } from './ProfileSaga';

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CONFIRM_RESET_PASSWORD_REQUEST,
  CONFIRM_RESET_PASSWORD_SUCCESS,
  CONFIRM_RESET_PASSWORD_ERROR,
  CREATE_STRIPE_LINK_REQUEST,
  CREATE_STRIPE_LINK_SUCCESS,
  CREATE_STRIPE_LINK_ERROR,
} = authTypes;

const { CLEANUP_PROFILE } = profileTypes;
const { CLEANUP_DOMAINS } = domainsTypes;
const { CLEANUP_SUBSCRIPTIONS } = subscriptionsTypes;
const { SHOW_ERROR, CLEANUP_ERROR } = notificationTypes;
const { CLEANUP_COACHES } = coachesTypes;
const { CLEANUP_HOMEWORKS } = homeworksTypes;
const { CLEANUP_MEMBERS } = membersTypes;
const { CLEANUP_MEETINGS } = meetingsTypes;
const { CLEANUP_PROGRAMS } = programsTypes;
const { CLEANUP_EXERCISES } = exercisesTypes;
const { CLEANUP_CHALLENGES } = challengesTypes
const { CLEANUP_MEMBER_PROFILE } = memberProfileTypes;
const { CLEANUP_COACH_PROFILES } = coachProfilesTypes;
const { CLEANUP_MESSAGES } = messagesTypes;
const { CLEANUP_NOTIFICATIONS } = notificationsTypes;
const { CLEANUP_REPORTS } = reportsTypes;
const { CLEANUP_WIDGET } = widgetTypes;
const { CLEANUP_COUNTRIES } = countriesTypes;

function* loginUser(action) {
  let response = null;

  try {
    response = yield call(api.post, '/auth/sign_in', {
      body: {
        email: action.email,
        password: action.password,
      },
      headers: { 'Access-Control-Expose-Headers': 'access-token, client, uid' },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Please, try again later'),
    });
    return yield put({
      type: LOGIN_ERROR,
      error: errorHandler(error, 'Please, try again later'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: LOGIN_SUCCESS,
      data: {
        accessToken: response.headers['access-token'],
        accessClient: response.headers.client,
        accessUID: response.headers.uid,
        is_onboarding_finished: response.data.is_onboarding_finished,
        stripe: response.data.stripe,
      },
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: LOGIN_ERROR, error: 'Please, try again later' });
}

function* createUser(action) {
  let response = null;
  let response2 = null;
  const { fullName: name, email, password } = action.values;
  const terms_and_privacy_confirmed = action.values.readAll;
  const role = action.role;

  try {
    response = yield call(api.post, '/auth', {
      body: {
        email,
        password,
        name,
        terms_and_privacy_confirmed,
        role,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Please, try again later'),
    });
    return yield put({
      type: SIGNUP_ERROR,
      error: errorHandler(error, 'Please, try again later'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: SIGNUP_SUCCESS,
      data: {
        accessToken: response.headers['access-token'],
        accessClient: response.headers.client,
        accessUID: response.headers.uid,
        is_onboarding_finished: response.data.data.is_onboarding_finished,
        stripe: response.data.stripe,
        role: action.role,
      },
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: SIGNUP_ERROR, error: 'Please, try again later' });
}

function* logout() {
  //full cleanup
  yield put({ type: CLEANUP_PROFILE });
  yield put({ type: CLEANUP_DOMAINS });
  yield put({ type: CLEANUP_SUBSCRIPTIONS });
  yield put({ type: CLEANUP_COACHES });
  yield put({ type: CLEANUP_HOMEWORKS });
  yield put({ type: CLEANUP_ERROR });
  yield put({ type: CLEANUP_MEMBERS });
  yield put({ type: CLEANUP_MEETINGS });
  yield put({ type: CLEANUP_PROGRAMS });
  yield put({ type: CLEANUP_EXERCISES });
  yield put({ type: CLEANUP_CHALLENGES });
  yield put({ type: CLEANUP_COACH_PROFILES });
  yield put({ type: CLEANUP_MESSAGES });
  yield put({ type: CLEANUP_NOTIFICATIONS });
  yield put({ type: CLEANUP_REPORTS });
  yield put({ type: CLEANUP_COUNTRIES });
  yield put({ type: CLEANUP_WIDGET });
  return yield put({ type: CLEANUP_MEMBER_PROFILE });
}

function* resetPassword(action) {
  let response = null;
  const email = action.email.email;

  try {
    response = yield call(api.get, '/auth/password/edit', {
      query: {
        email: email,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Reset password error'),
    });
    return yield put({
      type: RESET_PASSWORD_ERROR,
      error: errorHandler(error, 'Reset password error'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: RESET_PASSWORD_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Reset password error' });
  return yield put({
    type: RESET_PASSWORD_ERROR,
    error: 'Reset password error',
  });
}

function* confirmResetPassword(action) {
  let response = null;
  const { token, values } = action;

  try {
    response = yield call(api.put, '/auth/password', {
      body: {
        reset_password_token: token,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update the password"),
    });
    return yield put({
      type: CONFIRM_RESET_PASSWORD_ERROR,
      error: errorHandler(error, "Can't update the password"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: CONFIRM_RESET_PASSWORD_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update the password" });
  return yield put({
    type: CONFIRM_RESET_PASSWORD_ERROR,
    error: "Can't update the password",
  });
}

function* createStripeLink(action) {
  let response = null;

  try {
    response = yield call(api.post, '/stripe/accounts/create_link', {
      body: {
        country: action.country,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't generate the link to stripe service"),
    });
    return yield put({
      type: CREATE_STRIPE_LINK_ERROR,
      error: errorHandler(error, "Can't generate the link to stripe service"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: CREATE_STRIPE_LINK_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't generate the link to stripe service",
  });
  return yield put({
    type: CREATE_STRIPE_LINK_ERROR,
    error: "Can't generate the link to stripe service",
  });
}

function* getUserInfo() {
  return yield call(getUserProfile);
}

export default function* watch() {
  yield all([
    takeEvery(LOGIN_SUCCESS, getUserInfo),
    takeEvery(LOGIN_REQUEST, loginUser),
    takeEvery(LOGOUT, logout),
    takeEvery(SIGNUP_REQUEST, createUser),
    takeEvery(RESET_PASSWORD_REQUEST, resetPassword),
    takeEvery(CONFIRM_RESET_PASSWORD_REQUEST, confirmResetPassword),
    takeEvery(CREATE_STRIPE_LINK_REQUEST, createStripeLink),
  ]);
}
