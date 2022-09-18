import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';
import api from 'lib/api';
import subscriptionsTypes from 'lib/redux/types/subscriptions';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_SUBSCRIPTIONS_REQUEST,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
} = subscriptionsTypes;

const { SHOW_ERROR } = notificationTypes;

function* getSubscriptions() {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/subscriptions/');
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Can\'t get subscriptions list') ,
    });
    return yield put({
      type: GET_SUBSCRIPTIONS_ERROR,
      error: errorHandler(error, 'Can\'t get subscriptions list') ,
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_SUBSCRIPTIONS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Can\'t get subscriptions list' });
  return yield put({ type: GET_SUBSCRIPTIONS_ERROR, error: 'Can\'t get subscriptions list' });
}

export default function* watch() {
  yield all([
    takeEvery(GET_SUBSCRIPTIONS_REQUEST, getSubscriptions),
  ]);
}
