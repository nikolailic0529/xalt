import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import memberCRFTypes from 'lib/redux/types/member_crf';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_MEMBER_CRF_SUCCESS,
  GET_MEMBER_CRF_ERROR,
  GET_MEMBER_CRF_REQUEST,
  CALCULATE_MEMBER_CRF_REQUEST,
  CALCULATE_MEMBER_CRF_SUCCESS,
  CALCULATE_MEMBER_CRF_ERROR,
} = memberCRFTypes;

const { SHOW_ERROR } = notificationTypes;

function* getMemberCRFs() {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/member/member_crves');
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
    return yield put({
      type: GET_MEMBER_CRF_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MEMBER_CRF_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't receive the info about this member",
  });
  return yield put({
    type: GET_MEMBER_CRF_ERROR,
    error: "Can't receive the info about this member",
  });
}

function* calculateMemberCRF(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/member/member_crves', {
      body: {
        member_id: action.member_id,
      },
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't calculate CRF for this member"),
    });
  }

  if (response.status === 200) {
    // yield put({
    //   type: SHOW_SUCCESS,
    //   success: 'Successfully calculated CRF!',
    // });
    return yield put({
      type: CALCULATE_MEMBER_CRF_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't calculate CRF for this member" });
  return yield put({
    type: CALCULATE_MEMBER_CRF_ERROR,
    error: "Can't calculate CRF for this member",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_MEMBER_CRF_REQUEST, getMemberCRFs),
    takeEvery(CALCULATE_MEMBER_CRF_REQUEST, calculateMemberCRF),
  ]);
}
