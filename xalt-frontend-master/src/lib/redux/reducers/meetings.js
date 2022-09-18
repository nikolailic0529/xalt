import {createReducer, createActions} from 'reduxsauce';

import meetingsTypes from 'lib/redux/types/meetings';

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
  CLEANUP_MEETINGS,
} = meetingsTypes;

const {Types, Creators} = createActions({
  getMeetingsRequest: [
    'time_from',
    'time_to',
    'pagination',
    'per_page',
    'sort',
  ],
  getMeetingsSuccess: null,
  getMeetingsError: null,
  createMeetingRequest: [
    'coach_profile_id',
    'member_profile_id',
    'program_id',
    'time_from',
    'time_to',
  ],
  createMeetingSuccess: null,
  createMeetingError: null,
  updateMeetingRequest: ['id', 'is_member_confirmed'],
  updateMeetingSuccess: null,
  updateMeetingError: null,
  cleanupMeetings: null,
});

export default Creators;

export const INITIAL_STATE = {
  meetings: [],
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
    meetings: data,
  };
};

const failure = (state, {error}) => {
  return {
    ...state,
    fetching: false,
    error,
  };
};

const createSuccess = (state, {data}) => {
  return {
    ...state,
    fetching: false,
    meetings: [...state.meetings, data],
  };
};

const updateSuccess = (state, {data}) => {
  return {
    ...state,
    fetching: false,
    meetings: state.meetings.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          is_member_confirmed: data.is_member_confirmed,
        };
      } else return item;
    }),
  };
};

const cleanup = () => {
  return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_MEETINGS_REQUEST]: request,
  [GET_MEETINGS_SUCCESS]: success,
  [GET_MEETINGS_ERROR]: failure,
  [CREATE_MEETING_REQUEST]: request,
  [CREATE_MEETING_SUCCESS]: createSuccess,
  [CREATE_MEETING_ERROR]: failure,
  [UPDATE_MEETING_REQUEST]: request,
  [UPDATE_MEETING_SUCCESS]: updateSuccess,
  [UPDATE_MEETING_ERROR]: failure,
  [CLEANUP_MEETINGS]: cleanup,
});
