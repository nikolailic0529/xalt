import {call, put, all, takeEvery} from 'redux-saga/effects';

import api from 'lib/api';
import memberProfileTypes from 'lib/redux/types/member_profile';
import programTypes from 'lib/redux/types/programs';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_MEMBER_PROFILE_REQUEST,
  GET_MEMBER_PROFILE_SUCCESS,
  GET_MEMBER_PROFILE_ERROR,
  GET_SESSIONS_REQUEST,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
} = memberProfileTypes;

const {
  ADD_PROGRAM_REQUEST,
  ADD_PROGRAM_SUCCESS,
  ADD_PROGRAM_ERROR,
  UPDATE_PROGRAM_REQUEST,
  UPDATE_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_ERROR,
  DELETE_PROGRAM_EXERCISE_REQUEST,
  DELETE_PROGRAM_EXERCISE_SUCCESS,
  DELETE_PROGRAM_EXERCISE_ERROR,
} = programTypes;

const {SHOW_ERROR} = notificationTypes;

function* getMemberProfile(action) {
  let response = null;

  try {
    response = yield call(
      api.get,
      `/api/v1/member/member_profiles/${action.id}`,
      {
        query: {
          include:
            'programs.program_exercises,subscription,user,fitnes_domains,reports',
        },
      },
    );
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
    return yield put({
      type: GET_MEMBER_PROFILE_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MEMBER_PROFILE_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't receive the info about this member",
  });
  return yield put({
    type: GET_MEMBER_PROFILE_ERROR,
    error: "Can't receive the info about this member",
  });
}

function* addProgram(action) {
  let response = null;

  try {
    response = yield call(api.post, `/api/v1/coach/programs`, {
      body: {
        ...action.body,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't add the program for this member"),
    });
    return yield put({
      type: ADD_PROGRAM_ERROR,
      error: errorHandler(error, "Can't add the program for this member"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: ADD_PROGRAM_SUCCESS,
      data: response.data,
    });
    return yield put({
      type: GET_SESSIONS_REQUEST,
      id: action.member_profile_id,
    });
  }

  yield put({type: SHOW_ERROR, error: "Can't add the program for this member"});
  return yield put({
    type: ADD_PROGRAM_ERROR,
    error: "Can't add the program for this member",
  });
}

function* updateProgram(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/coach/programs/${action.id}`, {
      body: {
        ...action.body,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update program for this member"),
    });
    return yield put({
      type: UPDATE_PROGRAM_ERROR,
      error: errorHandler(error, "Can't update program for this member"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: UPDATE_PROGRAM_SUCCESS,
      data: response.data,
    });
    return yield put({
      type: GET_SESSIONS_REQUEST,
      id: action.member_id,
    });
  }

  yield put({type: SHOW_ERROR, error: "Can't update program for this member"});
  return yield put({
    type: UPDATE_PROGRAM_ERROR,
    error: "Can't update program for this member",
  });
}

function* deleteProgramExercise(action) {
  const {program_type, program_id, exercise_id} = action;
  let response = null;

  try {
    response = yield call(
      api.delete,
      `/api/v1/coach/program_exercises/${exercise_id}`,
    );
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't delete exercise from this program"),
    });
    return yield put({
      type: DELETE_PROGRAM_EXERCISE_ERROR,
      error: errorHandler(error, "Can't delete exercise from this program"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: DELETE_PROGRAM_EXERCISE_SUCCESS,
      data: {
        program_type,
        program_id,
        exercise_id,
      },
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't delete exercise from this program",
  });
  return yield put({
    type: DELETE_PROGRAM_EXERCISE_ERROR,
    error: "Can't delete exercise from this program",
  });
}

function* getSessions(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/member/programs`, {
      query: {
        member_profile_id: action.id,
        program_type: 'session',
        include: 'program_exercises.exercise',
        time_from: action.time_from,
        time_to: action.time_to,
        pagination: false,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive sessions"),
    });
    return yield put({
      type: GET_SESSIONS_ERROR,
      error: errorHandler(error, "Can't receive sessions"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_SESSIONS_SUCCESS,
      data: response.data,
    });
  }

  yield put({type: SHOW_ERROR, error: "Can't receive sessions"});
  return yield put({
    type: GET_SESSIONS_ERROR,
    error: "Can't receive sessions",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_MEMBER_PROFILE_REQUEST, getMemberProfile),
    takeEvery(ADD_PROGRAM_REQUEST, addProgram),
    takeEvery(UPDATE_PROGRAM_REQUEST, updateProgram),
    takeEvery(GET_SESSIONS_REQUEST, getSessions),
    takeEvery(DELETE_PROGRAM_EXERCISE_REQUEST, deleteProgramExercise),
  ]);
}
