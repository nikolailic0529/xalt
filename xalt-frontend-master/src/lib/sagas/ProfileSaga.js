import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import profileTypes from 'lib/redux/types/profile';
import authTypes from 'lib/redux/types/auth';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';
import modalsTypes from 'lib/redux/types/modals';

const { TOGGLE_CHANGE_PASSWORD_MODAL } = modalsTypes;

const {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  BOOK_COACH_REQUEST,
  BOOK_COACH_SUCCESS,
  BOOK_COACH_ERROR,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_ERROR,
  ONE_TIME_CHECKOUT_REQUEST,
  ONE_TIME_CHECKOUT_SUCCESS,
  ONE_TIME_CHECKOUT_ERROR,
  CREATE_MEMBER_PROFILE_REQUEST,
  CREATE_MEMBER_PROFILE_SUCCESS,
  CREATE_MEMBER_PROFILE_ERROR,
  UPDATE_MEMBER_PROFILE_REQUEST,
  UPDATE_MEMBER_PROFILE_SUCCESS,
  UPDATE_MEMBER_PROFILE_ERROR,
  UPDATE_PROFILE_DATA_REQUEST,
  UPDATE_PROFILE_DATA_SUCCESS,
  UPDATE_PROFILE_DATA_ERROR,
  UPDATE_PROFILE_PASSWORD_REQUEST,
  UPDATE_PROFILE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_PASSWORD_ERROR,
  UPDATE_PROFILE_SOCIAL_LINKS_REQUEST,
  UPDATE_PROFILE_SOCIAL_LINKS_SUCCESS,
  UPDATE_PROFILE_SOCIAL_LINKS_ERROR,
  UPDATE_PROFILE_FITNESS_DOMAINS_REQUEST,
  UPDATE_PROFILE_FITNESS_DOMAINS_SUCCESS,
  UPDATE_PROFILE_FITNESS_DOMAINS_ERROR,
  CREATE_BANK_ACCOUNT_ON_ONBOARDING_REQUEST,
  CREATE_BANK_ACCOUNT_ON_ONBOARDING_SUCCESS,
  CREATE_BANK_ACCOUNT_ON_ONBOARDING_ERROR,
  CREATE_BANK_ACCOUNT_REQUEST,
  CREATE_BANK_ACCOUNT_SUCCESS,
  CREATE_BANK_ACCOUNT_ERROR,
  DESTROY_BANK_ACCOUNT_REQUEST,
  DESTROY_BANK_ACCOUNT_SUCCESS,
  DESTROY_BANK_ACCOUNT_ERROR,
  UPDATE_PROFILE_MEASUREMENTS_REQUEST,
  UPDATE_PROFILE_MEASUREMENTS_SUCCESS,
  UPDATE_PROFILE_MEASUREMENTS_ERROR,
} = profileTypes;

const { FINISH_ONBOARDING_REQUEST, FINISH_ONBOARDING_SUCCESS, FINISH_ONBOARDING_ERROR, LOGOUT } =
  authTypes;

const { SHOW_ERROR, SHOW_SUCCESS } = notificationTypes;

export function* getUserProfile() {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/self_info', {
      query: {
        include:
          'member_profile.subscription,coach_profile,coach_profile.fitnes_domains,coach_profile.clientelle',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive user profile"),
    });
    return yield put({
      type: GET_USER_PROFILE_ERROR,
      error: errorHandler(error, "Can't receive user profile"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_USER_PROFILE_SUCCESS,
      data: response.data,
    });
  }

  if (response.status === 401) {
    return yield put({ type: LOGOUT });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive user profile" });
  return yield put({
    type: GET_USER_PROFILE_ERROR,
    error: "Can't receive user profile",
  });
}

function* createMemberProfile(action) {
  let response = null;

  const url =
    action.role === 'member' ? '/api/v1/member/member_profiles' : '/api/v1/coach_profiles';

  const body =
    action.role === 'coach'
      ? {
          ...action.onboardingProfile,
          about: "I'm the best",
        }
      : {
          ...action.onboardingProfile,
        };

  try {
    response = yield call(api.post, url, {
      body,
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't create user profile"),
    });
    return yield put({
      type: CREATE_MEMBER_PROFILE_ERROR,
      error: errorHandler(error, "Can't create user profile"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: CREATE_MEMBER_PROFILE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't create user profile" });
  return yield put({
    type: CREATE_MEMBER_PROFILE_ERROR,
    error: "Can't create user profile",
  });
}

function* updateMemberProfile(action) {
  let response = null;

  const url =
    action.role === 'member'
      ? `/api/v1/member/member_profiles/${action.id}`
      : `/api/v1/coach_profiles/${action.id}`;

  const body = {
    ...action.onboardingProfile,
  };

  try {
    response = yield call(api.put, url, {
      body,
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update user profile"),
    });

    return yield put({
      type: UPDATE_MEMBER_PROFILE_ERROR,
      error: errorHandler(error, "Can't update user profile"),
    });
  }

  if (response.status === 200) {
    yield call(getUserProfile);
    return yield put({
      type: UPDATE_MEMBER_PROFILE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({
    type: UPDATE_MEMBER_PROFILE_ERROR,
    error: 'Please, try again later',
  });
}

function* finishOnboardingProfile(action) {
  let response = null;

  try {
    response = yield call(api.put, '/api/v1/update_current_user', {
      body: {
        is_onboarding_finished: true,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't finish onboarding user profile"),
    });
    return yield put({
      type: FINISH_ONBOARDING_ERROR,
      error: errorHandler(error, "Can't finish onboarding user profile"),
    });
  }
  if (response.status === 200) {
    yield put({
      type: GET_USER_PROFILE_SUCCESS,
      data: response.data,
    });
    return yield put({
      type: FINISH_ONBOARDING_SUCCESS,
    });
  }
}

function* bookCoach(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/member/member_profiles/${action.member_profile_id}`, {
      body: {
        coach_profile_id: action.coach_profile_id,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't book coach"),
    });
    return yield put({
      type: BOOK_COACH_ERROR,
      error: errorHandler(error, "Can't book coach"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: BOOK_COACH_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't book coach" });
  return yield put({
    type: BOOK_COACH_ERROR,
    error: "Can't book coach",
  });
}

function* checkout(action) {
  let response = null;

  try {
    response = yield call(api.post, `/api/v1/${action.url}`, {
      body: {
        card_data: action.cardData,
        coupon: action.coupon,
        subscription_type: action.pay_type || 'subscription',
        amount: action.amount,
        lesson_count: action.lesson_count || 0,
        currency: action.currency || 'usd',
      },
      headers: { 'Content-type': 'application/json' },
    });
  } catch (error) {
    yield call(getUserProfile);
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't finish checkout"),
    });
    return yield put({
      type: CHECKOUT_ERROR,
      error: errorHandler(error, "Can't finish checkout"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully subscribed!',
    });
    yield call(getUserProfile);
    return yield put({
      type: CHECKOUT_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't finish checkout" });
  return yield put({
    type: CHECKOUT_ERROR,
    error: "Can't finish checkout",
  });
}

function* oneTimeCheckout(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/one_time_checkout', {
      body: {
        subscription_type: action.pay_type,
        amount: action.amount,
        lesson_count: action.lesson_count,
      },
    });
  } catch (error) {
    yield call(getUserProfile);
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't finish checkout"),
    });
    return yield put({
      type: ONE_TIME_CHECKOUT_ERROR,
      error: errorHandler(error, "Can't finish checkout"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully added!',
    });
    yield call(getUserProfile);
    return yield put({
      type: ONE_TIME_CHECKOUT_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't finish checkout" });
  return yield put({
    type: ONE_TIME_CHECKOUT_ERROR,
    error: "Can't finish checkout",
  });
}

function* updateProfileData(action) {
  let response = null;

  try {
    response = yield call(api.put, '/api/v1/update_current_user', {
      body: action.data,
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update user profile"),
    });
  }

  if (response.status === 200) {
    yield call(getUserProfile);
    return yield put({
      type: UPDATE_PROFILE_DATA_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update user profile" });
  return yield put({
    type: UPDATE_PROFILE_DATA_ERROR,
    error: "Can't update user profile",
  });
}

function* updateProfileSocialLinks({ data: { id, socialNetworkLinks } }) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/coach_profiles/${id}`, {
      body: {
        social_network_links: socialNetworkLinks,
      },
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update user profile"),
    });
  }

  if (response.status === 200) {
    return yield put({ type: UPDATE_PROFILE_SOCIAL_LINKS_SUCCESS });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update user profile" });
  return yield put({
    type: UPDATE_PROFILE_SOCIAL_LINKS_ERROR,
    error: "Can't update user profile",
  });
}

function* updateProfileFitnessDomainsLinks({ data: { id, ids } }) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/coach_profiles/${id}`, {
      body: {
        fitnes_domain_ids: ids,
      },
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update user profile"),
    });
  }

  if (response.status === 200) {
    yield call(getUserProfile);
    return yield put({ type: UPDATE_PROFILE_FITNESS_DOMAINS_SUCCESS });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update user profile" });
  return yield put({
    type: UPDATE_PROFILE_FITNESS_DOMAINS_ERROR,
    error: "Can't update user profile",
  });
}

function* updateProfilePassword({ data }) {
  let response = null;

  try {
    response = yield call(api.put, '/api/v1/change_password', {
      body: data,
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update user password"),
    });
  }

  if (response.status === 200) {
    yield put({ type: TOGGLE_CHANGE_PASSWORD_MODAL });
    return yield put({ type: UPDATE_PROFILE_PASSWORD_SUCCESS });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update user password" });
  return yield put({
    type: UPDATE_PROFILE_PASSWORD_ERROR,
    error: "Can't update user password",
  });
}

function* createOnboardingBankAccount(action) {
  let response = null;

  try {
    response = yield call(api.post, '/stripe/accounts/create_bank_account', {
      body: {
        bank_data: action.values,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't create bank account"),
    });
    return yield put({
      type: CREATE_BANK_ACCOUNT_ON_ONBOARDING_ERROR,
      error: errorHandler(error, "Can't create bank account"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: CREATE_BANK_ACCOUNT_ON_ONBOARDING_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't create bank account",
  });
  return yield put({
    type: CREATE_BANK_ACCOUNT_ON_ONBOARDING_ERROR,
    error: "Can't create bank account",
  });
}

function* destroyBankAccount() {
  let response = null;

  try {
    response = yield call(api.delete, '/stripe/accounts/destroy_bank_account');
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't destroy the bank account"),
    });

    return yield put({
      type: DESTROY_BANK_ACCOUNT_ERROR,
      error: errorHandler(error, "Can't destroy the bank account"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: DESTROY_BANK_ACCOUNT_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({
    type: DESTROY_BANK_ACCOUNT_ERROR,
    error: 'Please, try again later',
  });
}

function* createBankAccount(action) {
  let response = null;

  try {
    yield call(destroyBankAccount);

    response = yield call(api.post, '/stripe/accounts/create_bank_account', {
      body: {
        bank_data: action.data,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't create bank account"),
    });
    return yield put({
      type: CREATE_BANK_ACCOUNT_ERROR,
      error: errorHandler(error, "Can't create bank account"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully saved payment!',
    });
    return yield put({
      type: CREATE_BANK_ACCOUNT_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't create bank account",
  });
  return yield put({
    type: CREATE_BANK_ACCOUNT_ERROR,
    error: "Can't create bank account",
  });
}

function* updateProfileMeasurements(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/member/member_profiles/${action.id}/measurements`, {
      body: {
        measurements: action.measurements,
      },
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update member profile"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully saved!',
    });
    return yield put({ type: UPDATE_PROFILE_MEASUREMENTS_SUCCESS, data: response.data });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update member profile" });
  return yield put({
    type: UPDATE_PROFILE_MEASUREMENTS_ERROR,
    error: "Can't update member profile",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_USER_PROFILE_REQUEST, getUserProfile),
    takeEvery(CREATE_MEMBER_PROFILE_REQUEST, createMemberProfile),
    takeEvery(UPDATE_MEMBER_PROFILE_REQUEST, updateMemberProfile),
    takeEvery(BOOK_COACH_REQUEST, bookCoach),
    takeEvery(CHECKOUT_REQUEST, checkout),
    takeEvery(ONE_TIME_CHECKOUT_REQUEST, oneTimeCheckout),
    takeEvery(FINISH_ONBOARDING_REQUEST, finishOnboardingProfile),
    takeEvery(UPDATE_PROFILE_DATA_REQUEST, updateProfileData),
    takeEvery(UPDATE_PROFILE_SOCIAL_LINKS_REQUEST, updateProfileSocialLinks),
    takeEvery(UPDATE_PROFILE_FITNESS_DOMAINS_REQUEST, updateProfileFitnessDomainsLinks),
    takeEvery(UPDATE_PROFILE_PASSWORD_REQUEST, updateProfilePassword),
    takeEvery(CREATE_BANK_ACCOUNT_ON_ONBOARDING_REQUEST, createOnboardingBankAccount),
    takeEvery(CREATE_BANK_ACCOUNT_REQUEST, createBankAccount),
    takeEvery(DESTROY_BANK_ACCOUNT_REQUEST, destroyBankAccount),
    takeEvery(UPDATE_PROFILE_MEASUREMENTS_REQUEST, updateProfileMeasurements),
  ]);
}
