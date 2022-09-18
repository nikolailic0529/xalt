import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import membersTypes from 'lib/redux/types/members';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const { GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS, GET_MEMBERS_ERROR } = membersTypes;
const { SHOW_ERROR } = notificationTypes;

function* getMembers(action) {
  let response = null;

  console.log('---1111----');

  try {
    response = yield call(api.get, '/api/v1/members', {
      query: {
        include: 'member_profile',
        ...action.filters,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of members"),
    });
    return yield put({
      type: GET_MEMBERS_ERROR,
      error: errorHandler(error, "Can't receive the list of members"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MEMBERS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the list of members" });
  return yield put({
    type: GET_MEMBERS_ERROR,
    error: "Can't receive the list of members",
  });
}

export default function* watch() {
  yield all([takeEvery(GET_MEMBERS_REQUEST, getMembers)]);
}
