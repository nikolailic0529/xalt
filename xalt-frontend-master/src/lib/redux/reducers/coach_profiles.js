import { createReducer, createActions } from 'reduxsauce';

import coachProfilesTypes from 'lib/redux/types/coach_profiles';

const {
  GET_COACH_PROFILES_REQUEST,
  GET_COACH_PROFILES_SUCCESS,
  GET_COACH_PROFILES_ERROR,
  CLEANUP_COACH_PROFILES,
} = coachProfilesTypes;

const { Types, Creators } = createActions({
  getCoachProfilesRequest: ['id'],
  getCoachProfilesSuccess: null,
  getCoachProfilesError: null,
  cleanupCoachProfiles: null,
});

export default Creators;

export const INITIAL_STATE = {
  coach_profiles: null,
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
  coach_profiles: data,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_COACH_PROFILES_REQUEST]: request,
  [GET_COACH_PROFILES_SUCCESS]: success,
  [GET_COACH_PROFILES_ERROR]: failure,
  [CLEANUP_COACH_PROFILES]: cleanup,
});
