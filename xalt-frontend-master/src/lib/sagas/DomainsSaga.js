import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import domainsTypes from 'lib/redux/types/domains';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_FITNES_DOMAINS_REQUEST,
  GET_FITNES_DOMAINS_SUCCESS,
  GET_FITNES_DOMAINS_ERROR,
} = domainsTypes;
const { SHOW_ERROR } = notificationTypes;

function* getDomains(action) {
  let response = null;
  const { role } = action;

  try {
    response = yield call(api.get, '/api/v1/fitnes_domains'); // member
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Can\'t receive the list of domains'),
    });
    return yield put({
      type: GET_FITNES_DOMAINS_ERROR,
      error: errorHandler(error, 'Can\'t receive the list of domains'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_FITNES_DOMAINS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Can\'t receive the list of domains' });
  return yield put({ type: GET_FITNES_DOMAINS_ERROR, error: 'Can\'t receive the list of domains' });
}

export default function* watch() {
  yield all([takeEvery(GET_FITNES_DOMAINS_REQUEST, getDomains)]);
}
