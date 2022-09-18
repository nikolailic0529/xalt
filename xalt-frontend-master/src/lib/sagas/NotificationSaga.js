import { put, delay, takeEvery } from 'redux-saga/effects';
import notificationTypes from 'lib/redux/types/notification';

const { SHOW_ERROR, CLEANUP_ERROR, SHOW_SUCCESS, CLEANUP_SUCCESS } = notificationTypes;

function* cleanError() {
  yield delay(3000);
  return yield put({ type: CLEANUP_ERROR });
}

function* cleanSuccess() {
  yield delay(3000);
  return yield put({ type: CLEANUP_SUCCESS });
}

export default function* watch() {
  yield takeEvery(SHOW_ERROR, cleanError);
  yield takeEvery(SHOW_SUCCESS, cleanSuccess);
}
