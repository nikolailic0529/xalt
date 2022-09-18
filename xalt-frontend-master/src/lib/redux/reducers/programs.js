import {createReducer, createActions} from 'reduxsauce';

import programsTypes from 'lib/redux/types/programs';

const {
  GET_PROGRAMS_REQUEST,
  GET_PROGRAMS_SUCCESS,
  GET_PROGRAMS_ERROR,
  CLEANUP_PROGRAMS,
} = programsTypes;

const {Types, Creators} = createActions({
  getProgramsRequest: ['program_type', 'search_string'],
  getProgramsSuccess: null,
  getProgramsError: null,
  cleanupPrograms: null,
});

export default Creators;

export const INITIAL_STATE = {
  programs: [],
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
    programs: data,
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
  [GET_PROGRAMS_REQUEST]: request,
  [GET_PROGRAMS_SUCCESS]: success,
  [GET_PROGRAMS_ERROR]: failure,
  [CLEANUP_PROGRAMS]: cleanup,
});
