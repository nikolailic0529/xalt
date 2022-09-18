import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import notificationsTypes from 'lib/redux/types/notifications';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_ERROR,
  DELETE_ALL_NOTIFICATIONS_REQUEST,
  DELETE_ALL_NOTIFICATIONS_SUCCESS,
  DELETE_ALL_NOTIFICATIONS_ERROR,
} = notificationsTypes;

const { SHOW_ERROR } = notificationTypes;

function* getNotifications() {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/notifications');
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t receive the list of notifications') });

    return yield put({ type: GET_NOTIFICATIONS_ERROR, error: errorHandler(error, 'Can\'t receive the list of notifications') });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_NOTIFICATIONS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_NOTIFICATIONS_ERROR, error: 'Please, try again later' });
}

function* updateNotification(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/notifications/${action.id}`, { body: action.data });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t update the notification') });

    return yield put({ type: UPDATE_NOTIFICATION_ERROR, error: errorHandler(error, 'Can\'t update the notification') });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_NOTIFICATION_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: UPDATE_NOTIFICATION_ERROR, error: 'Please, try again later' });
}

function* deleteAllNotifications() {
  let response = null;

  try {
    response = yield call(api.delete, '/api/v1/notifications/bulk_destroy');

    yield call(getNotifications);
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t delete all notifications') });

    return yield put({ type: UPDATE_NOTIFICATION_ERROR, error: errorHandler(error, 'Can\'t update the notification') });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_NOTIFICATION_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: UPDATE_NOTIFICATION_ERROR, error: 'Please, try again later' });
}

export default function* watch() {
  yield all([
    takeEvery(GET_NOTIFICATIONS_REQUEST, getNotifications),
    takeEvery(UPDATE_NOTIFICATION_REQUEST, updateNotification),
    takeEvery(DELETE_ALL_NOTIFICATIONS_REQUEST, deleteAllNotifications),
  ]);
}
