import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import reportsTypes from 'lib/redux/types/reports';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_ERROR,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_ERROR,
  GET_REPORT_QUESTIONS_REQUEST,
  GET_REPORT_QUESTIONS_SUCCESS,
  GET_REPORT_QUESTIONS_ERROR,
  REPORT_NOT_FOUND,
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_SUCCESS,
  UPDATE_REPORT_ERROR,
} = reportsTypes;

const { SHOW_ERROR } = notificationTypes;

function* getReports(action) {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/coach/reports', {
      query: {
        ...action.filters,
        include: 'member_profile.user,report_answers,questions',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of reports"),
    });

    return yield put({
      type: GET_REPORTS_ERROR,
      error: errorHandler(error, "Can't receive the list of reports"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_REPORTS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({
    type: GET_REPORTS_ERROR,
    error: 'Please, try again later',
  });
}

function* getReport(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/coach/reports/${action.id}`, {
      query: { include: 'member_profile.user,report_answers,questions' },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the report"),
    });

    yield put({ type: REPORT_NOT_FOUND });

    return yield put({
      type: GET_REPORT_ERROR,
      error: errorHandler(error, "Can't receive the report"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_REPORT_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({
    type: GET_REPORT_ERROR,
    error: 'Please, try again later',
  });
}

function* updateReport(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/coach/reports/${action.id}`, {
      body: action.data,
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update the report"),
    });

    return yield put({
      type: UPDATE_REPORT_ERROR,
      error: errorHandler(error, "Can't update the report"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_REPORT_SUCCESS,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({
    type: UPDATE_REPORT_ERROR,
    error: 'Please, try again later',
  });
}

function* getQuestions() {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/report_questions', {
      query: {
        question_type: 'rating',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't get the list of questions"),
    });

    return yield put({
      type: GET_REPORT_QUESTIONS_ERROR,
      error: errorHandler(error, "Can't get the list of questions"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_REPORT_QUESTIONS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({
    type: GET_REPORT_QUESTIONS_ERROR,
    error: 'Please, try again later',
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_REPORTS_REQUEST, getReports),
    takeEvery(GET_REPORT_REQUEST, getReport),
    takeEvery(UPDATE_REPORT_REQUEST, updateReport),
    takeEvery(GET_REPORT_QUESTIONS_REQUEST, getQuestions),
  ]);
}
