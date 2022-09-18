/* eslint-disable no-nested-ternary */
import { createReducer, createActions } from 'reduxsauce';

import profileTypes from 'lib/redux/types/profile';

import authTypes from 'lib/redux/types/auth';

const {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  BOOK_COACH_REQUEST,
  BOOK_COACH_SUCCESS,
  BOOK_COACH_ERROR,
  CHANGE_ONBOARDING_PROFILE,
  CLEANUP_PROFILE,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_ERROR,
  ONE_TIME_CHECKOUT_REQUEST,
  ONE_TIME_CHECKOUT_SUCCESS,
  ONE_TIME_CHECKOUT_ERROR,
  CREATE_MEMBER_PROFILE_REQUEST,
  CREATE_MEMBER_PROFILE_SUCCESS,
  CREATE_MEMBER_PROFILE_ERROR,
  UPDATE_MEMBER_PROFILE_REQUEST,
  UPDATE_MEMBER_PROFILE_SUCCESS,
  UPDATE_MEMBER_PROFILE_ERROR,
  UPDATE_PROFILE_DATA_REQUEST,
  UPDATE_PROFILE_DATA_SUCCESS,
  UPDATE_PROFILE_DATA_ERROR,
  UPDATE_PROFILE_PASSWORD_REQUEST,
  UPDATE_PROFILE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_PASSWORD_ERROR,
  UPDATE_PROFILE_SOCIAL_LINKS_REQUEST,
  UPDATE_PROFILE_SOCIAL_LINKS_SUCCESS,
  UPDATE_PROFILE_SOCIAL_LINKS_ERROR,
  UPDATE_PROFILE_FITNESS_DOMAINS_REQUEST,
  UPDATE_PROFILE_FITNESS_DOMAINS_SUCCESS,
  UPDATE_PROFILE_FITNESS_DOMAINS_ERROR,
  CREATE_BANK_ACCOUNT_ON_ONBOARDING_REQUEST,
  CREATE_BANK_ACCOUNT_ON_ONBOARDING_SUCCESS,
  CREATE_BANK_ACCOUNT_ON_ONBOARDING_ERROR,
  CREATE_BANK_ACCOUNT_REQUEST,
  CREATE_BANK_ACCOUNT_SUCCESS,
  CREATE_BANK_ACCOUNT_ERROR,
  DESTROY_BANK_ACCOUNT_REQUEST,
  DESTROY_BANK_ACCOUNT_SUCCESS,
  DESTROY_BANK_ACCOUNT_ERROR,
  UPDATE_PROFILE_MEASUREMENTS_REQUEST,
  UPDATE_PROFILE_MEASUREMENTS_SUCCESS,
  UPDATE_PROFILE_MEASUREMENTS_ERROR,
} = profileTypes;

const { SIGNUP_SUCCESS } = authTypes;

const { Types, Creators } = createActions({
  getUserProfileRequest: null,
  getUserProfileSuccess: null,
  getUserProfileError: null,
  bookCoachRequest: ['member_profile_id', 'coach_profile_id'],
  bookCoachSuccess: null,
  bookCoachError: null,
  changeOnboardingProfile: ['field', 'value'],
  cleanupProfile: null,
  checkoutRequest: ['cardData', 'url', 'coupon', 'pay_type', 'amount', 'lesson_count', 'currency'],
  checkoutSuccess: null,
  checkoutError: null,
  oneTimeCheckoutRequest: ['amount', 'lesson_count', 'pay_type'],
  oneTimeCheckoutSuccess: null,
  oneTimeCheckoutError: null,
  createMemberProfileRequest: ['onboardingProfile', 'role'],
  createMemberProfileSuccess: null,
  createMemberProfileError: null,
  updateMemberProfileRequest: ['onboardingProfile', 'role', 'id'],
  updateMemberProfileSuccess: null,
  updateMemberProfileError: null,
  updateProfileMeasurementsRequest: ['measurements', 'id'],
  updateProfileMeasurementsSuccess: null,
  updateProfileMeasurementsError: null,
  signupSuccess: null,
  updateProfileDataRequest: ['data'],
  updateProfileDataSuccess: null,
  updateProfileDataError: null,
  updateProfilePasswordRequest: ['data'],
  updateProfilePasswordSuccess: null,
  updateProfilePasswordError: null,
  updateProfileSocialLinksRequest: ['data'],
  updateProfileSocialLinksSuccess: null,
  updateProfileSocialLinksError: null,
  updateProfileFitnessDomainsRequest: ['data'],
  updateProfileFitnessDomainsSuccess: null,
  updateProfileFitnessDomainsError: null,
  createBankAccountOnOnboardingRequest: ['values'],
  createBankAccountOnOnboardingSuccess: null,
  createBankAccountOnOnboardingError: null,
  createBankAccountRequest: ['data'],
  createBankAccountSuccess: null,
  createBankAccountError: null,
  destroyBankAccountRequest: null,
  destroyBankAccountSuccess: null,
  destroyBankAccountError: null,
});

export default Creators;

export const INITIAL_STATE = {
  id: null,
  email: null,
  name: null,
  role: null,
  member_profile: {},
  coach_profile: {},
  fetching: false,
  error: null,
  onboardingProfile: {},
  allow_password_change: false,
  created_at: null,
  deleted: null,
  nickname: null,
  provider: null,
  stripe: {},
  terms_and_privacy_confirmed: null,
  uid: null,
  updated_at: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  ...data,
  role: data?.role || state?.role,
});

const getUserProfileSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  ...data,
  role: data?.role || state?.role,
  onboardingProfile: data.is_onboarding_finished
    ? state?.onboardingProfile
    : data?.role === 'coach'
    ? data.coach_profile || {}
    : data.member_profile || {},
});

const updateProfileSocialLinksSuccess = (state) => ({ ...state });

const updateMemberProfileSuccess = (state, { ...data }) => {
  if (data.data.user.role === 'coach') {
    return {
      ...state,
      fetching: false,
      error: null,
      coach_profile: data.data,
    };
  }
  if (data.data.user.role === 'member') {
    return {
      ...state,
      fetching: false,
      error: null,
      member_profile: {
        id: data.data.id,
        hours_spend_last_week: data.data.hours_spend_last_week,
        fitnes_domains: data.data.fitnes_domains,
        subscription_id: data.data.subscription_id,
      },
    };
  }
};

const updateProfileMeasurementsSuccess = (state, { ...data }) => ({
  ...state,
  fetching: false,
  member_profile: {
    measurements: data.data.measurements,
  },
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const bookCoachSuccess = (state, { coach_profile_id }) => ({
  ...state,
  fetching: false,
  member_profile: {
    ...state.member_profile,
    coach_profile_id,
  },
});

const changeOnboardingProfile = (state, { field, value }) => ({
  ...state,
  onboardingProfile: {
    ...state.onboardingProfile,
    [field]: value,
  },
});

const cleanup = () => INITIAL_STATE;

const signupSuccess = (state, { data }) => ({
  ...state,
  role: data.role,
});

const updateProfileFitnessDomainsSuccess = (state) => state;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_USER_PROFILE_REQUEST]: request,
  [GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess,
  [GET_USER_PROFILE_ERROR]: failure,
  [BOOK_COACH_REQUEST]: request,
  [BOOK_COACH_SUCCESS]: bookCoachSuccess,
  [BOOK_COACH_ERROR]: failure,
  [CHANGE_ONBOARDING_PROFILE]: changeOnboardingProfile,
  [CLEANUP_PROFILE]: cleanup,
  [CHECKOUT_REQUEST]: request,
  [CHECKOUT_SUCCESS]: success,
  [CHECKOUT_ERROR]: failure,
  [ONE_TIME_CHECKOUT_REQUEST]: request,
  [ONE_TIME_CHECKOUT_SUCCESS]: success,
  [ONE_TIME_CHECKOUT_ERROR]: failure,
  [CREATE_MEMBER_PROFILE_REQUEST]: request,
  [CREATE_MEMBER_PROFILE_SUCCESS]: updateMemberProfileSuccess,
  [CREATE_MEMBER_PROFILE_ERROR]: failure,
  [UPDATE_MEMBER_PROFILE_REQUEST]: request,
  [UPDATE_MEMBER_PROFILE_SUCCESS]: updateMemberProfileSuccess,
  [UPDATE_MEMBER_PROFILE_ERROR]: failure,
  [SIGNUP_SUCCESS]: signupSuccess,
  [UPDATE_PROFILE_DATA_REQUEST]: request,
  [UPDATE_PROFILE_DATA_SUCCESS]: success,
  [UPDATE_PROFILE_DATA_ERROR]: failure,
  [UPDATE_PROFILE_PASSWORD_REQUEST]: request,
  [UPDATE_PROFILE_PASSWORD_SUCCESS]: success,
  [UPDATE_PROFILE_PASSWORD_ERROR]: failure,
  [UPDATE_PROFILE_SOCIAL_LINKS_REQUEST]: request,
  [UPDATE_PROFILE_SOCIAL_LINKS_SUCCESS]: updateProfileSocialLinksSuccess,
  [UPDATE_PROFILE_SOCIAL_LINKS_ERROR]: failure,
  [UPDATE_PROFILE_FITNESS_DOMAINS_REQUEST]: request,
  [UPDATE_PROFILE_FITNESS_DOMAINS_SUCCESS]: updateProfileFitnessDomainsSuccess,
  [UPDATE_PROFILE_FITNESS_DOMAINS_ERROR]: failure,
  [CREATE_BANK_ACCOUNT_ON_ONBOARDING_REQUEST]: request,
  [CREATE_BANK_ACCOUNT_ON_ONBOARDING_SUCCESS]: success,
  [CREATE_BANK_ACCOUNT_ON_ONBOARDING_ERROR]: failure,
  [CREATE_BANK_ACCOUNT_REQUEST]: request,
  [CREATE_BANK_ACCOUNT_SUCCESS]: success,
  [CREATE_BANK_ACCOUNT_ERROR]: failure,
  [DESTROY_BANK_ACCOUNT_REQUEST]: request,
  [DESTROY_BANK_ACCOUNT_SUCCESS]: success,
  [DESTROY_BANK_ACCOUNT_ERROR]: failure,
  [UPDATE_PROFILE_MEASUREMENTS_REQUEST]: request,
  [UPDATE_PROFILE_MEASUREMENTS_SUCCESS]: updateProfileMeasurementsSuccess,
  [UPDATE_PROFILE_MEASUREMENTS_ERROR]: failure,
});
