import { createReducer, createActions } from 'reduxsauce';

import authTypes from 'lib/redux/types/auth';

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  FINISH_ONBOARDING_REQUEST,
  FINISH_ONBOARDING_SUCCESS,
  FINISH_ONBOARDING_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  CONFIRM_RESET_PASSWORD_REQUEST,
  CONFIRM_RESET_PASSWORD_SUCCESS,
  CONFIRM_RESET_PASSWORD_ERROR,
  SET_IS_SIGNUP_SUCCEEDED,
  CREATE_STRIPE_LINK_REQUEST,
  CREATE_STRIPE_LINK_SUCCESS,
  CREATE_STRIPE_LINK_ERROR,
  CLEAR_STRIPE_LINK,
} = authTypes;

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: null,
  loginError: null,
  logout: null,
  signupRequest: ['values', 'role'],
  signupSuccess: null,
  signupError: null,
  finishOnboardingRequest: ['onboardingProfile', 'role'],
  finishOnboardingSuccess: null,
  finishOnboardingError: null,
  resetPasswordRequest: ['email'],
  resetPasswordSuccess: null,
  resetPasswordError: null,
  confirmResetPasswordRequest: ['values', 'token'],
  confirmResetPasswordSuccess: null,
  confirmResetPasswordError: null,
  setIsSignupSucceeded: ['status'],
  createStripeLinkRequest: ['country'],
  createStripeLinkSuccess: null,
  createStripeLinkError: null,
  clearStripeLink: null,
});

export default Creators;

export const INITIAL_STATE = {
  accessToken: null,
  accessClient: null,
  accessUID: null,
  is_onboarding_finished: false,
  role: null,
  isSignupSucceeded: false,
  stripe: {},
  fetching: false,
  error: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (
  state,
  { data: { accessToken, accessClient, accessUID, is_onboarding_finished, role, stripe } },
) => ({
  ...state,
  fetching: false,
  error: null,
  accessToken,
  accessClient,
  accessUID,
  is_onboarding_finished,
  role,
  isSignupSucceeded: true,
  stripe,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const finishOnboardingSuccess = (state) => ({
  ...state,
  is_onboarding_finished: true,
});

const setIsSignupSucceeded = (state, { status }) => ({
  ...state,
  isSignupSucceeded: status,
});

const createStripeLinkSuccess = (state, { data }) => ({
  ...state,
  stripe: data,
});

const clearLink = (state) => ({
  ...state,
  stripe: {
    ...state.stripe,
    url: '',
  },
});

const logout = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [LOGIN_REQUEST]: request,
  [LOGIN_SUCCESS]: success,
  [LOGIN_ERROR]: failure,
  [LOGOUT]: logout,
  [SIGNUP_REQUEST]: request,
  [SIGNUP_SUCCESS]: success,
  [SIGNUP_ERROR]: failure,
  [FINISH_ONBOARDING_REQUEST]: request,
  [FINISH_ONBOARDING_SUCCESS]: finishOnboardingSuccess,
  [FINISH_ONBOARDING_ERROR]: failure,
  [RESET_PASSWORD_REQUEST]: request,
  [RESET_PASSWORD_ERROR]: failure,
  [CONFIRM_RESET_PASSWORD_REQUEST]: request,
  [CONFIRM_RESET_PASSWORD_SUCCESS]: success,
  [CONFIRM_RESET_PASSWORD_ERROR]: failure,
  [SET_IS_SIGNUP_SUCCEEDED]: setIsSignupSucceeded,
  [CREATE_STRIPE_LINK_REQUEST]: request,
  [CREATE_STRIPE_LINK_SUCCESS]: createStripeLinkSuccess,
  [CREATE_STRIPE_LINK_ERROR]: failure,
  [CLEAR_STRIPE_LINK]: clearLink,
});
