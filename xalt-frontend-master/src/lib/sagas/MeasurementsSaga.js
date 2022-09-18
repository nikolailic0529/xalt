import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import measurementsTypes from 'lib/redux/types/measurements';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';
import jsonToFormData from 'json-form-data';

const {
  GET_ALL_MEASUREMENTS_REQUEST,
  GET_ALL_MEASUREMENTS_SUCCESS,
  GET_ALL_MEASUREMENTS_ERROR,
  CREATE_NEW_MEASUREMENT_REQUEST,
  CREATE_NEW_MEASUREMENT_SUCCESS,
  CREATE_NEW_MEASUREMENT_ERROR,
  UPDATE_MEASUREMENT_REQUEST,
  UPDATE_MEASUREMENT_SUCCESS,
  UPDATE_MEASUREMENT_ERROR,
} = measurementsTypes;

const { SHOW_ERROR, SHOW_SUCCESS } = notificationTypes;

function* getAllMeasurements(action) {
  let response = null;
  try {
    response = yield call(api.get, `/api/v1/measurements/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Failed to get measurements for user'),
    });

    return yield put({
      type: GET_ALL_MEASUREMENTS_ERROR,
      error: errorHandler(error, 'Failed to get measurements for user'),
    });
  }

  if (response.status >= 200 && response.status < 300) {
    return yield put({
      type: GET_ALL_MEASUREMENTS_SUCCESS,
      data: response.data,
    });
  }
  yield put({
    type: SHOW_ERROR,
    error: errorHandler(error, 'failed to get measurements, try again'),
  });

  return yield put({
    type: GET_ALL_MEASUREMENTS_ERROR,
    error: errorHandler(error, 'failed to get measurements, try again'),
  });
}

function* createNewMeasurement(action) {
  let response = null;
  try {
    response = yield call(api.post, `/api/v1/measurements`, {
      body: action.data,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Failed to create measurement for user'),
    });

    return yield put({
      type: CREATE_NEW_MEASUREMENT_ERROR,
      error: errorHandler(error, 'Failed to create measurement for user'),
    });
  }

  if (response.status >= 200 && response.status < 300) {
    return yield put({
      type: CREATE_NEW_MEASUREMENT_SUCCESS,
      data: response.data,
    });
  }
  yield put({
    type: SHOW_ERROR,
    error: errorHandler(error, 'Failed to create measurement for user, try again'),
  });

  return yield put({
    type: CREATE_NEW_MEASUREMENT_ERROR,
    error: errorHandler(error, 'Failed to create measurement for user, try again'),
  });
}

function* updateMeasurement(action) {
  let response = null;
  try {
    response = yield call(api.put, `/api/v1/measurements`, {
      body: jsonToFormData(action.data),
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Failed to update measurement for user'),
    });

    return yield put({
      type: UPDATE_MEASUREMENT_ERROR,
      error: errorHandler(error, 'Failed to update measurement for user'),
    });
  }

  if (response.status >= 200 && response.status < 300) {
    return yield put({
      type: UPDATE_MEASUREMENT_SUCCESS,
      data: response.data,
    });
  }
  yield put({
    type: SHOW_ERROR,
    error: errorHandler(error, 'Failed to update measurement for user, try again'),
  });

  return yield put({
    type: UPDATE_MEASUREMENT_ERROR,
    error: errorHandler(error, 'Failed to update measurement for user, try again'),
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_ALL_MEASUREMENTS_REQUEST, getAllMeasurements),
    takeEvery(CREATE_NEW_MEASUREMENT_REQUEST, createNewMeasurement),
    takeEvery(UPDATE_MEASUREMENT_REQUEST, updateMeasurement),
  ]);
}
