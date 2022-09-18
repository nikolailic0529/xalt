import { createReducer, createActions } from 'reduxsauce';

import contactUsTypes from 'lib/redux/types/contact_us';

const {
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CONTACT_US_ERROR,
  CLEANUP_CONTACT_US,
} = contactUsTypes;

const { Types, Creators } = createActions({
  contactUsRequest: ['values'],
  contactUsSuccess: null,
  contactUsError: null,
  cleanupContactUs: null,
});

export default Creators;

export const INITIAL_STATE = {
  fetching: false,
  error: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (state) => ({
  ...state,
  fetching: false,
  error: null,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [CONTACT_US_REQUEST]: request,
  [CONTACT_US_SUCCESS]: success,
  [CONTACT_US_ERROR]: failure,
  [CLEANUP_CONTACT_US]: cleanup,
});
