import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from 'lib/api';
import coachesTypes from 'lib/redux/types/coaches';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const { GET_COACHES_REQUEST, GET_COACHES_SUCCESS, GET_COACHES_ERROR } = coachesTypes;
const { SHOW_ERROR } = notificationTypes;

function* getCoaches(action) {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/coaches', {
      query: {
        include: 'coach_profile.fitnes_domains',
        page: action.page,
        per_page: action.per_page,
        type: action.coachType,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of coaches"),
    });
    return yield put({
      type: GET_COACHES_ERROR,
      error: errorHandler(error, "Can't receive the list of coaches"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_COACHES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the list of coaches" });
  return yield put({
    type: GET_COACHES_ERROR,
    error: "Can't receive the list of coaches",
  });
}

export default function* watch() {
  yield all([takeLatest(GET_COACHES_REQUEST, getCoaches)]);
}
