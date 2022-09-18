import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import meetingsTypes from 'lib/redux/types/meetings';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_MEETINGS_REQUEST,
  GET_MEETINGS_SUCCESS,
  GET_MEETINGS_ERROR,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  UPDATE_MEETING_REQUEST,
  UPDATE_MEETING_SUCCESS,
  UPDATE_MEETING_ERROR,
} = meetingsTypes;
const { SHOW_ERROR } = notificationTypes;

function* getMeetings(action) {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/meetings', {
      query: {
        include: 'coach_profile.user,member_profile.user,program,report',
        time_from: action.time_from,
        time_to: action.time_to,
        pagination: action.pagination,
        per_page: action.per_page,
        sort: action.sort,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of meetings"),
    });
    return yield put({
      type: GET_MEETINGS_ERROR,
      error: errorHandler(error, "Can't receive the list of meetings"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MEETINGS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the list of meetings" });
  return yield put({
    type: GET_MEETINGS_ERROR,
    error: "Can't receive the list of meetings",
  });
}

function* createMeeting(action) {
  let response = null;
  const {
    coach_profile_id,
    member_profile_id,
    program_id,
    time_from,
    time_to,
  } = action;

  try {
    const formData = new FormData();
    formData.append('coach_profile_id', coach_profile_id);
    formData.append('member_profile_id', member_profile_id);
    formData.append('program_id', program_id);
    formData.append('time_from', time_from);
    formData.append('time_to', time_to);
    response = yield call(api.post, '/api/v1/meetings', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't create the meeting"),
    });
    return yield put({
      type: CREATE_MEETING_ERROR,
      error: errorHandler(error, "Can't create the meeting"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: CREATE_MEETING_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't create the meeting" });
  return yield put({
    type: CREATE_MEETING_ERROR,
    error: "Can't create the meeting",
  });
}

function* updateMeeting(action) {
  let response = null;
  const { id, is_member_confirmed } = action;

  try {
    response = yield call(api.put, `/api/v1/meetings/${id}`, {
      body: { is_member_confirmed },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update the meeting"),
    });
    return yield put({
      type: UPDATE_MEETING_ERROR,
      error: errorHandler(error, "Can't update the meeting"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_MEETING_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update the meeting" });
  return yield put({
    type: UPDATE_MEETING_ERROR,
    error: "Can't update the meeting",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_MEETINGS_REQUEST, getMeetings),
    takeEvery(CREATE_MEETING_REQUEST, createMeeting),
    takeEvery(UPDATE_MEETING_REQUEST, updateMeeting),
  ]);
}
