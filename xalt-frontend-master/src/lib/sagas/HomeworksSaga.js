import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import homeworksTypes from 'lib/redux/types/homeworks';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_HOMEWORKS_REQUEST,
  GET_HOMEWORKS_SUCCESS,
  GET_HOMEWORKS_ERROR,
  UPDATE_HOMEWORK_REQUEST,
  UPDATE_HOMEWORK_SUCCESS,
  UPDATE_HOMEWORK_ERROR,
} = homeworksTypes;
const { SHOW_ERROR } = notificationTypes;

function* getHomeworks(action) {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/member/programs', {
      query: {
        include: 'program_exercises.exercise',
        program_type: 'homework',
        member_profile_id: action.id,
        time_from: action.time_from,
        time_to: action.time_to,
        pagination: false,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of actions"),
    });
    return yield put({
      type: GET_HOMEWORKS_ERROR,
      error: errorHandler(error, "Can't receive the list of actions"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_HOMEWORKS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the list of actions" });
  return yield put({
    type: GET_HOMEWORKS_ERROR,
    error: "Can't receive the list of actions",
  });
}

function* completeHomework(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/member/programs/${action.id}`, {
      body: {
        completed: 'true',
      },
      query: {
        include: 'program_exercises.exercise',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update action"),
    });
    return yield put({
      type: UPDATE_HOMEWORK_ERROR,
      error: errorHandler(error, "Can't update action"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_HOMEWORK_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update action" });
  return yield put({
    type: UPDATE_HOMEWORK_ERROR,
    error: "Can't update action",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_HOMEWORKS_REQUEST, getHomeworks),
    takeEvery(UPDATE_HOMEWORK_REQUEST, completeHomework),
  ]);
}
