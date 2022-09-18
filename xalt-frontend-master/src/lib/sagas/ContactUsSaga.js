import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import contactUsTypes from 'lib/redux/types/contact_us';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const { CONTACT_US_REQUEST, CONTACT_US_SUCCESS, CONTACT_US_ERROR } =
  contactUsTypes;
const { SHOW_ERROR, SHOW_SUCCESS } = notificationTypes;

function* contactUs(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/contact_us', {
      body: { ...action.values },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(
        error,
        "Can't send the message, please try again later",
      ),
    });
    return yield put({
      type: CONTACT_US_ERROR,
      error: errorHandler(
        error,
        "Can't send the message, please try again later",
      ),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Your message is delivered!',
    });
    return yield put({
      type: CONTACT_US_SUCCESS,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't send the message, please try again later",
  });
  return yield put({
    type: CONTACT_US_ERROR,
    error: "Can't send the message, please try again later",
  });
}

export default function* watch() {
  yield all([takeEvery(CONTACT_US_REQUEST, contactUs)]);
}
