import {createReducer, createActions} from 'reduxsauce';

import homeworksTypes from 'lib/redux/types/homeworks';

const {
  GET_HOMEWORKS_REQUEST,
  GET_HOMEWORKS_SUCCESS,
  GET_HOMEWORKS_ERROR,
  UPDATE_HOMEWORK_REQUEST,
  UPDATE_HOMEWORK_SUCCESS,
  UPDATE_HOMEWORK_ERROR,
  CLEANUP_HOMEWORKS,
} = homeworksTypes;

const {Types, Creators} = createActions({
  getHomeworksRequest: ['id', 'time_from', 'time_to'],
  getHomeworksSuccess: null,
  getHomeworksError: null,
  updateHomeworkRequest: ['id'],
  updateHomeworkSuccess: null,
  updateHomeworkError: null,
  cleanupHomeworks: null,
});

export default Creators;

export const INITIAL_STATE = {
  homeworks: [],
  fetching: false,
  error: null,
};

const request = (state) => {
  return {
    ...state,
    fetching: true,
  };
};

const success = (state, {data}) => {
  return {
    ...state,
    fetching: false,
    homeworks: data,
  };
};

const updateSuccess = (state, {data}) => {
  return {
    ...state,
    fetching: false,
    homeworks: state.homeworks.map((item) => {
      if (item.id === data.id) {
        return {...item, completed: true}
      } else {
        return item;
      }
    }),
  };
};

const failure = (state, {error}) => {
  return {
    ...state,
    fetching: false,
    error,
  };
};

const cleanup = () => {
  return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_HOMEWORKS_REQUEST]: request,
  [GET_HOMEWORKS_SUCCESS]: success,
  [GET_HOMEWORKS_ERROR]: failure,
  [UPDATE_HOMEWORK_REQUEST]: request,
  [UPDATE_HOMEWORK_SUCCESS]: updateSuccess,
  [UPDATE_HOMEWORK_ERROR]: failure,
  [CLEANUP_HOMEWORKS]: cleanup,
});
