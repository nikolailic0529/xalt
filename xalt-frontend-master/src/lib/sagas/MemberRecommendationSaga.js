import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import memberRecommendationTypes from 'lib/redux/types/member_recommendations';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_MEMBER_RECOMMENDATION_SUCCESS,
  GET_MEMBER_RECOMMENDATION_ERROR,
  GET_MEMBER_RECOMMENDATION_REQUEST,
} = memberRecommendationTypes;

const { SHOW_ERROR } = notificationTypes;

function* getMemberRecommendations(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/member/member_recommendations', {
      body: {
        member_id: action.member_id,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
    return yield put({
      type: GET_MEMBER_RECOMMENDATION_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MEMBER_RECOMMENDATION_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't receive the info about this member",
  });
  return yield put({
    type: GET_MEMBER_RECOMMENDATION_ERROR,
    error: "Can't receive the info about this member",
  });
}

export default function* watch() {
  yield all([takeEvery(GET_MEMBER_RECOMMENDATION_REQUEST, getMemberRecommendations)]);
}
