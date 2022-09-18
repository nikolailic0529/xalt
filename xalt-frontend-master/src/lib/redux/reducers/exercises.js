import { createReducer, createActions } from 'reduxsauce';

import exercisesTypes from 'lib/redux/types/exercises';

const {
  GET_ALL_EXERCISES_REQUEST,
  GET_ALL_EXERCISES_SUCCESS,
  GET_ALL_EXERCISES_ERROR,
  GET_MY_EXERCISES_REQUEST,
  GET_MY_EXERCISES_SUCCESS,
  GET_MY_EXERCISES_ERROR,
  CLEANUP_EXERCISES,
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

const { Types, Creators } = createActions({
  getAllExercisesRequest: ['filters'],
  getAllExercisesSuccess: null,
  getAllExercisesError: null,
  getMyExercisesRequest: ['filters'],
  getMyExercisesSuccess: null,
  getMyExercisesError: null,
  cleanupExercises: null,
  addExerciseRequest: ['exercise'],
  addExerciseSuccess: null,
  addExerciseError: null,
  removeExerciseRequest: ['id'],
  removeExerciseSuccess: null,
  removeExerciseError: null,
  getExerciseRequest: ['id'],
  getExerciseSuccess: null,
  getExerciseError: null,
  updateExerciseRequest: ['id', 'exercise'],
  updateExerciseSuccess: null,
  updateExerciseError: null,
  voteExerciseRequest: ['data'],
  voteExerciseSuccess: null,
  voteExerciseError: null,
  unvoteExerciseRequest: ['id'],
  unvoteExerciseSuccess: null,
  unvoteExerciseError: null,
});

export default Creators;

export const INITIAL_STATE = {
  exercises: [],
  exercise: null,
  fetching: false,
  error: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  exercises: data,
});

const getExerciseSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  exercise: data,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

const voteExerciseSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  exercise: {
    ...state.exercise,
    vote_record: [...state.exercise.vote_record, data],
  },
});

const unvoteExerciseSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  exercise: {
    ...state.exercise,
    vote_record: state.exercise.vote_record.filter((vote) => vote.id !== data.id),
  },
});

export const reducer = createReducer(INITIAL_STATE, {
  [GET_ALL_EXERCISES_REQUEST]: request,
  [GET_ALL_EXERCISES_SUCCESS]: success,
  [GET_ALL_EXERCISES_ERROR]: failure,
  [GET_MY_EXERCISES_REQUEST]: request,
  [GET_MY_EXERCISES_SUCCESS]: success,
  [GET_MY_EXERCISES_ERROR]: failure,
  [CLEANUP_EXERCISES]: cleanup,
  [ADD_EXERCISE_REQUEST]: request,
  [ADD_EXERCISE_SUCCESS]: success,
  [ADD_EXERCISE_ERROR]: failure,
  [REMOVE_EXERCISE_REQUEST]: request,
  [REMOVE_EXERCISE_SUCCESS]: success,
  [REMOVE_EXERCISE_ERROR]: failure,
  [GET_EXERCISE_REQUEST]: request,
  [GET_EXERCISE_SUCCESS]: getExerciseSuccess,
  [GET_EXERCISE_ERROR]: failure,
  [UPDATE_EXERCISE_REQUEST]: request,
  [UPDATE_EXERCISE_SUCCESS]: success,
  [UPDATE_EXERCISE_ERROR]: failure,
  [VOTE_EXERCISE_REQUEST]: request,
  [VOTE_EXERCISE_SUCCESS]: voteExerciseSuccess,
  [VOTE_EXERCISE_ERROR]: failure,
  [UNVOTE_EXERCISE_REQUEST]: request,
  [UNVOTE_EXERCISE_SUCCESS]: unvoteExerciseSuccess,
  [UNVOTE_EXERCISE_ERROR]: failure,
});
