import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import challengesTypes from 'lib/redux/types/challenges';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';
import jsonToFormData from 'json-form-data';

const {
  RESET_STATE_REQUEST,
  RESET_STATE_SUCCESS,
  RESET_STATE_ERROR,
  GET_TOP_CHALLENGES_REQUEST,
  GET_TOP_CHALLENGES_SUCCESS,
  GET_TOP_CHALLENGES_ERROR,
  GET_MY_CHALLENGES_REQUEST,
  GET_MY_CHALLENGES_SUCCESS,
  GET_MY_CHALLENGES_ERROR,
  GET_SEARCHED_CHALLENGES_REQUEST,
  GET_SEARCHED_CHALLENGES_SUCCESS,
  GET_SEARCHED_CHALLENGES_ERROR,
  ADD_CHALLENGE_REQUEST,
  ADD_CHALLENGE_SUCCESS,
  ADD_CHALLENGE_ERROR,
  REMOVE_CHALLENGE_REQUEST,
  REMOVE_CHALLENGE_SUCCESS,
  REMOVE_CHALLENGE_ERROR,
  GET_CHALLENGE_REQUEST,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
  UPDATE_CHALLENGE_REQUEST,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_ERROR,
  VOTE_CHALLENGE_REQUEST,
  VOTE_CHALLENGE_SUCCESS,
  VOTE_CHALLENGE_ERROR,
  UNVOTE_CHALLENGE_REQUEST,
  UNVOTE_CHALLENGE_SUCCESS,
  UNVOTE_CHALLENGE_ERROR,
  ENROLL_IN_CHALLENGE_REQUEST,
  ENROLL_IN_CHALLENGE_SUCCESS,
  ENROLL_IN_CHALLENGE_ERROR,
  UNENROLL_IN_CHALLENGE_REQUEST,
  UNENROLL_IN_CHALLENGE_SUCCESS,
  UNENROLL_IN_CHALLENGE_ERROR,
  CANCEL_CHALLENGE_REQUEST,
  CANCEL_CHALLENGE_SUCCESS,
  CANCEL_CHALLENGE_ERROR,
  GET_ENROLLED_CHALLENGES_REQUEST,
  GET_ENROLLED_CHALLENGES_SUCCESS,
  GET_ENROLLED_CHALLENGES_ERROR,
  CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST,
  CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
  CREATE_CHECK_IN_FOR_CHALLENGE_ERROR,
  UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST,
  UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
  UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR,
  GET_CHECK_INS_FOR_CHALLENGE_REQUEST,
  GET_CHECK_INS_FOR_CHALLENGE_SUCCESS,
  GET_CHECK_INS_FOR_CHALLENGE_ERROR,
  GET_CHECK_INS_FOR_USER_REQUEST,
  GET_CHECK_INS_FOR_USER_SUCCESS,
  GET_CHECK_INS_FOR_USER_ERROR,
  SET_CURRENT_CHALLENGE_REQUEST,
  SET_CURRENT_CHALLENGE_SUCCESS,
  SET_CURRENT_CHALLENGE_ERROR,
} = challengesTypes;

const { SHOW_ERROR, SHOW_SUCCESS } = notificationTypes;

function* resetState(action) {
  return yield put({
    type: RESET_STATE_SUCCESS,
  });
}

function* getTopChallenges(action) {
  let response = null;
  try {
    response = yield call(api.get, '/api/v1/member_challenges', {
      query: {
        ...action.filters,
        type: 'top',
        include: 'user,user_member_challenges,user_member_challenge_check_ins',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of challenges"),
    });

    return yield put({
      type: GET_TOP_CHALLENGES_ERROR,
      error: errorHandler(error, 'failed to retrieve most Popular challenges'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_TOP_CHALLENGES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_TOP_CHALLENGES_ERROR, error: 'Please, try again later' });
}

function* getMyChallenges(action) {
  let response = null;
  try {
    response = yield call(api.get, '/api/v1/member_challenges', {
      query: {
        ...action.filters,
        type: 'my',
        include: 'user,user_member_challenges,user_member_challenge_check_ins',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of challenges"),
    });

    return yield put({
      type: GET_MY_CHALLENGES_ERROR,
      error: errorHandler(error, "Can't receive the list of challenges"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MY_CHALLENGES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_MY_CHALLENGES_ERROR, error: 'Please, try again later' });
}

function* getEnrolledChallenges(action) {
  let response = null;
  try {
    response = yield call(api.get, '/api/v1/member_challenges', {
      query: {
        ...action.filters,
        type: 'enrolled',
        include: 'user,user_member_challenges,user_member_challenge_check_ins',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of challenges"),
    });

    return yield put({
      type: GET_ENROLLED_CHALLENGES_ERROR,
      error: errorHandler(error, 'failed to retrieve most Popular challenges'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_ENROLLED_CHALLENGES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_ENROLLED_CHALLENGES_ERROR, error: 'Please, try again later' });
}

function* getSearchedChallenges(action) {
  let response = null;
  try {
    response = yield call(api.get, '/api/v1/member_challenges', {
      query: {
        ...action.filters,
        type: 'search',
        include: 'user,user_member_challenges,user_member_challenge_check_ins',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of challenges"),
    });

    return yield put({
      type: GET_SEARCHED_CHALLENGES_ERROR,
      error: errorHandler(error, 'failed to retrieve most Popular challenges'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_SEARCHED_CHALLENGES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_SEARCHED_CHALLENGES_ERROR, error: 'Please, try again later' });
}

function* addChallenge(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/member_challenges', {
      body: jsonToFormData(action.challenge),
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SHOW_ERROR, error: errorHandler(error, "Can't add challenge") });

    return yield put({
      type: ADD_CHALLENGE_ERROR,
      error: errorHandler(error, "Can't add challenge"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully added challenge!',
    });
    return yield put({
      type: ADD_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't add challenge" });
  return yield put({ type: ADD_CHALLENGE_ERROR, error: "Can't add challenge" });
}

function* updateChallenge(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/member_challenges/${action.id}`, {
      body: jsonToFormData(action.challenge),
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, "Can't update challenge") });

    return yield put({
      type: UPDATE_CHALLENGE_ERROR,
      error: errorHandler(error, "Can't update challenge"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully updated challenge!',
    });
    return yield put({
      type: UPDATE_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update challenge" });
  return yield put({ type: UPDATE_CHALLENGE_ERROR, error: "Can't update challenge" });
}

function* removeChallenge(action) {
  let response = null;

  try {
    response = yield call(api.delete, `/api/v1/member_challenges/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });

    return yield put({
      type: REMOVE_CHALLENGE_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully deleted challenge!',
    });
    return yield put({
      type: REMOVE_CHALLENGE_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: REMOVE_CHALLENGE_ERROR, error: 'Please, try again later' });
}

function* getChallenge(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/member_challenges/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });

    return yield put({
      type: GET_CHALLENGE_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_CHALLENGE_ERROR, error: 'Please, try again later' });
}

function* voteChallenge(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/vote_records', {
      body: jsonToFormData(action.data),
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't vote challenge! Maybe, you already voted!"),
    });

    return yield put({
      type: VOTE_CHALLENGE_ERROR,
      error: errorHandler(error, "Can't vote challenge! Maybe, you already voted!"),
    });
  }

  if (response.status === 201) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'You have successfully voted for an challenge!',
    });
    return yield put({
      type: VOTE_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't vote challenge! Maybe, you already voted!" });
  return yield put({
    type: VOTE_CHALLENGE_ERROR,
    error: "Can't vote challenge! Maybe, you already voted!",
  });
}

function* unvoteChallenge(action) {
  let response = null;

  try {
    response = yield call(api.delete, `/api/v1/vote_records/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });

    return yield put({
      type: UNVOTE_CHALLENGE_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully unvoted challenge!',
    });
    return yield put({
      type: UNVOTE_CHALLENGE_SUCCESS,
      data: { id: action.id },
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: UNVOTE_CHALLENGE_ERROR, error: 'Please, try again later' });
}

function* enrollInChallenge(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/user_member_challenges', {
      body: jsonToFormData(action.data),
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, "Can't enroll in challenge") });

    return yield put({
      type: ENROLL_IN_CHALLENGE_ERROR,
      error: errorHandler(error, "Can't enroll challenge"),
    });
  }

  if (response.status === 200 || response.status === 201) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully enrolled in challenge!',
    });
    return yield put({
      type: ENROLL_IN_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't enroll in challenge" });
  return yield put({ type: ENROLL_IN_CHALLENGE_ERROR, error: "Can't enroll in challenge" });
}

function* unEnrollInChallenge(action) {
  let response = null;
  try {
    response = yield call(
      api.put,
      `/api/v1/user_member_challenges/${action.data.user_member_challenge.user_id}`,
      {
        body: jsonToFormData(action.data),
      },
    );
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, "Can't leave challenge") });

    return yield put({
      type: UNENROLL_IN_CHALLENGE_ERROR,
      error: errorHandler(error, "Can't leave challenge"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully Left Challenge!',
    });
    return yield put({
      type: UNENROLL_IN_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't leave challenge" });
  return yield put({ type: UNENROLL_IN_CHALLENGE_ERROR, error: "Can't leave challenge" });
}

function* createCheckInForChallenge(action) {
  let response = null;
  try {
    response = yield call(api.post, `/api/v1/user_member_challenge_check_ins`, {
      body: jsonToFormData(action.data),
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Failed to check in to challenge') });

    return yield put({
      type: CREATE_CHECK_IN_FOR_CHALLENGE_ERROR,
      error: errorHandler(error, 'Failed to check in to challenge'),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully verified checkin!',
    });
    return yield put({
      type: CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
      data: response.data,
    });
  } else if (response.status === 201) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully checked in to challenge!',
    });
    return yield put({
      type: CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Failed to check in to challenge' });
  return yield put({
    type: CREATE_CHECK_IN_FOR_CHALLENGE_ERROR,
    error: 'Failed to check in to challenge',
  });
}

function* updateCheckInForChallenge(action) {
  let response = null;

  try {
    response = yield call(
      api.put,
      `/api/v1/user_member_challenge_check_ins/${action.data.challenge_id}`,
      {
        body: action.data,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Failed to update check in of challenge'),
    });

    return yield put({
      type: UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR,
      error: errorHandler(error, 'Failed to update check in of challenge'),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully updated checked in of challenge!',
    });
    return yield put({
      type: UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Failed to update check in of challenge' });
  return yield put({
    type: UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR,
    error: 'Failed to update check in of challenge',
  });
}

function* getCheckInsForChallenge(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/user_member_challenge_check_ins`, {
      query: { ...action.filters, include: 'member_challenge_id' },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, 'Failed to get check ins for challenge'),
    });

    return yield put({
      type: GET_CHECK_INS_FOR_CHALLENGE_ERROR,
      error: errorHandler(error, 'Failed to get check ins for challenge'),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully retrieved check ins for challenge!',
    });
    return yield put({
      type: GET_CHECK_INS_FOR_CHALLENGE_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Failed to get check ins for challenge' });
  return yield put({
    type: GET_CHECK_INS_FOR_CHALLENGE_ERROR,
    error: 'Failed to get check ins for challenge',
  });
}
function* getCheckInsForUser(action) {
  let response = null;
  try {
    response = yield call(
      api.get,
      `/api/v1/user_member_challenge_check_ins/${action.filters.challenge_id}`,
      {
        query: { ...action.filters, include: 'user_id' },
      },
    );
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Failed to get check ins for user') });

    return yield put({
      type: GET_CHECK_INS_FOR_USER_ERROR,
      error: errorHandler(error, 'Failed to check in to challenge'),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_CHECK_INS_FOR_USER_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Failed to get check ins for user' });
  return yield put({
    type: GET_CHECK_INS_FOR_USER_ERROR,
    error: 'Failed to get check ins for user',
  });
}

function* setCurrentChallenge(action) {
  return yield put({
    type: SET_CURRENT_CHALLENGE_SUCCESS,
    data: action.data,
  });
}

export default function* watch() {
  yield all([
    takeEvery(RESET_STATE_REQUEST, resetState),
    takeEvery(GET_TOP_CHALLENGES_REQUEST, getTopChallenges),
    takeEvery(GET_MY_CHALLENGES_REQUEST, getMyChallenges),
    takeEvery(GET_SEARCHED_CHALLENGES_REQUEST, getSearchedChallenges),
    takeEvery(ADD_CHALLENGE_REQUEST, addChallenge),
    takeEvery(REMOVE_CHALLENGE_REQUEST, removeChallenge),
    takeEvery(GET_CHALLENGE_REQUEST, getChallenge),
    takeEvery(UPDATE_CHALLENGE_REQUEST, updateChallenge),
    takeEvery(VOTE_CHALLENGE_REQUEST, voteChallenge),
    takeEvery(UNVOTE_CHALLENGE_REQUEST, unvoteChallenge),
    takeEvery(ENROLL_IN_CHALLENGE_REQUEST, enrollInChallenge),
    takeEvery(UNENROLL_IN_CHALLENGE_REQUEST, unEnrollInChallenge),
    takeEvery(GET_ENROLLED_CHALLENGES_REQUEST, getEnrolledChallenges),
    takeEvery(CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST, createCheckInForChallenge),
    takeEvery(UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST, updateCheckInForChallenge),
    takeEvery(GET_CHECK_INS_FOR_CHALLENGE_REQUEST, getCheckInsForChallenge),
    takeEvery(GET_CHECK_INS_FOR_USER_REQUEST, getCheckInsForUser),
    takeEvery(SET_CURRENT_CHALLENGE_REQUEST, setCurrentChallenge),
  ]);
}
