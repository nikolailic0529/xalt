import { createReducer, createActions } from 'reduxsauce';

import notificationTypes from 'lib/redux/types/notification';

const { SHOW_ERROR, CLEANUP_ERROR, SHOW_SUCCESS, CLEANUP_SUCCESS } = notificationTypes;

const { Types, Creators } = createActions({
  showError: ['message'],
  cleanupError: null,
  showSuccess: ['message'],
  cleanupSuccess: null,
});

export default Creators;

export const INITIAL_STATE = {
  error: null,
  success: null,
};

const request = (state, { error }) => ({
  ...state,
  error,
});

const success = (state, { success }) => ({
  ...state,
  success,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [SHOW_ERROR]: request,
  [CLEANUP_ERROR]: cleanup,
  [SHOW_SUCCESS]: success,
  [CLEANUP_SUCCESS]: cleanup,
});
