import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import coachProfilesTypes from 'lib/redux/types/coach_profiles';
import notificationTypes from 'lib/redux/types/notification';

const {
  GET_COACH_PROFILES_REQUEST,
  GET_COACH_PROFILES_SUCCESS,
  GET_COACH_PROFILES_ERROR,
} = coachProfilesTypes;
const { SHOW_ERROR } = notificationTypes;

function* getCoachProfiles(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/coach_profiles/${action.id}`, {
      query: {
        include: 'fitnes_domains,user,coach_documents',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || "Can't receive the coach",
    });
    return yield put({
      type: GET_COACH_PROFILES_ERROR,
      error: error?.response?.data?.errors[0] || "Can't receive the coach",
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_COACH_PROFILES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the coach" });
  return yield put({
    type: GET_COACH_PROFILES_ERROR,
    error: "Can't receive the coach",
  });
}

export default function* watch() {
  yield all([takeEvery(GET_COACH_PROFILES_REQUEST, getCoachProfiles)]);
}
