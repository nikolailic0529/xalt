import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import programsTypes from 'lib/redux/types/programs';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_PROGRAMS_REQUEST,
  GET_PROGRAMS_SUCCESS,
  GET_PROGRAMS_ERROR,
} = programsTypes;
const { SHOW_ERROR } = notificationTypes;

function* getPrograms(action) {
  let response = null;
  const {
    program_type,
    search_string,
  } = action;

  try {
    response = yield call(api.get, '/api/v1/coach/programs', {
      query: {
        program_type,
        search_string,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Can\'t receive the list of programs'),
    });
    return yield put({
      type: GET_PROGRAMS_ERROR,
      error: errorHandler(error, 'Can\'t receive the list of programs'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_PROGRAMS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Can\'t receive the list of programs' });
  return yield put({ type: GET_PROGRAMS_ERROR, error: 'Can\'t receive the list of programs' });
}

export default function* watch() {
  yield all([
    takeEvery(GET_PROGRAMS_REQUEST, getPrograms),
  ]);
}
