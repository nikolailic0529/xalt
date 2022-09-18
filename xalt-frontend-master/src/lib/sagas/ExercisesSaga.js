import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import exercisesTypes from 'lib/redux/types/exercises';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';
import jsonToFormData from 'json-form-data';

const {
  GET_ALL_EXERCISES_REQUEST,
  GET_ALL_EXERCISES_SUCCESS,
  GET_ALL_EXERCISES_ERROR,
  GET_MY_EXERCISES_REQUEST,
  GET_MY_EXERCISES_SUCCESS,
  GET_MY_EXERCISES_ERROR,
  ADD_EXERCISE_REQUEST,
  ADD_EXERCISE_SUCCESS,
  ADD_EXERCISE_ERROR,
  REMOVE_EXERCISE_REQUEST,
  REMOVE_EXERCISE_SUCCESS,
  REMOVE_EXERCISE_ERROR,
  GET_EXERCISE_REQUEST,
  GET_EXERCISE_SUCCESS,
  GET_EXERCISE_ERROR,
  UPDATE_EXERCISE_REQUEST,
  UPDATE_EXERCISE_SUCCESS,
  UPDATE_EXERCISE_ERROR,
  VOTE_EXERCISE_REQUEST,
  VOTE_EXERCISE_SUCCESS,
  VOTE_EXERCISE_ERROR,
  UNVOTE_EXERCISE_REQUEST,
  UNVOTE_EXERCISE_SUCCESS,
  UNVOTE_EXERCISE_ERROR,
} = exercisesTypes;

const { SHOW_ERROR, SHOW_SUCCESS } = notificationTypes;

function* getAllExercises(action) {
  let response = null;

  console.log('--action.filters---', action.filters);
  try {
    response = yield call(api.get, '/api/v1/exercises', {
      query: { ...action.filters, include: 'user' },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of exrcises"),
    });

    return yield put({
      type: GET_ALL_EXERCISES_ERROR,
      error: errorHandler(error, "Can't receive the list of exrcises"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_ALL_EXERCISES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_ALL_EXERCISES_ERROR, error: 'Please, try again later' });
}

function* getMyExercises(action) {
  let response = null;
  
  try {
    response = yield call(api.get, '/api/v1/exercises', {
      query: { ...action.filters, include: 'user' },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of exercises"),
    });

    return yield put({
      type: GET_MY_EXERCISES_ERROR,
      error: errorHandler(error, "Can't receive the list of exercises"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MY_EXERCISES_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_MY_EXERCISES_ERROR, error: 'Please, try again later' });
}

function* addExercise(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/exercises', {
      body: jsonToFormData(action.exercise),
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, "Can't add exercise") });

    return yield put({
      type: ADD_EXERCISE_ERROR,
      error: errorHandler(error, "Can't add exercise"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully added exercise!',
    });
    return yield put({
      type: ADD_EXERCISE_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't add exercise" });
  return yield put({ type: ADD_EXERCISE_ERROR, error: "Can't add exercise" });
}

function* updateExercise(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/exercises/${action.id}`, {
      body: jsonToFormData(action.exercise),
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, "Can't update exercise") });

    return yield put({
      type: UPDATE_EXERCISE_ERROR,
      error: errorHandler(error, "Can't update exercise"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_EXERCISE_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update exercise" });
  return yield put({ type: UPDATE_EXERCISE_ERROR, error: "Can't update exercise" });
}

function* removeExercise(action) {
  let response = null;

  try {
    response = yield call(api.delete, `/api/v1/exercises/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });

    return yield put({
      type: REMOVE_EXERCISE_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully deleted exercise!',
    });
    return yield put({
      type: REMOVE_EXERCISE_SUCCESS,
      ...response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: REMOVE_EXERCISE_ERROR, error: 'Please, try again later' });
}

function* getExercise(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/exercises/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });

    return yield put({
      type: GET_EXERCISE_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_EXERCISE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_EXERCISE_ERROR, error: 'Please, try again later' });
}

function* voteExercise(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/vote_records', {
      body: jsonToFormData(action.data),
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't vote exercise! Maybe, you already voted!"),
    });

    return yield put({
      type: VOTE_EXERCISE_ERROR,
      error: errorHandler(error, "Can't vote exercise! Maybe, you already voted!"),
    });
  }

  if (response.status === 201) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'You have successfully voted for an exercise!',
    });
    return yield put({
      type: VOTE_EXERCISE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't vote exercise! Maybe, you already voted!" });
  return yield put({
    type: VOTE_EXERCISE_ERROR,
    error: "Can't vote exercise! Maybe, you already voted!",
  });
}

function* unvoteExercise(action) {
  let response = null;

  try {
    response = yield call(api.delete, `/api/v1/vote_records/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });

    return yield put({
      type: UNVOTE_EXERCISE_ERROR,
      error: error?.response?.data?.errors[0] || 'Please, try again later',
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully unvoted exercise!',
    });
    return yield put({
      type: UNVOTE_EXERCISE_SUCCESS,
      data: { id: action.id },
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: UNVOTE_EXERCISE_ERROR, error: 'Please, try again later' });
}

export default function* watch() {
  yield all([
    takeEvery(GET_ALL_EXERCISES_REQUEST, getAllExercises),
    takeEvery(GET_MY_EXERCISES_REQUEST, getMyExercises),
    takeEvery(ADD_EXERCISE_REQUEST, addExercise),
    takeEvery(REMOVE_EXERCISE_REQUEST, removeExercise),
    takeEvery(GET_EXERCISE_REQUEST, getExercise),
    takeEvery(UPDATE_EXERCISE_REQUEST, updateExercise),
    takeEvery(VOTE_EXERCISE_REQUEST, voteExercise),
    takeEvery(UNVOTE_EXERCISE_REQUEST, unvoteExercise),
  ]);
}
