import { createReducer, createActions } from 'reduxsauce';

import memberCRFTypes from 'lib/redux/types/member_crf';

const {
  GET_MEMBER_CRF_SUCCESS,
  GET_MEMBER_CRF_ERROR,
  GET_MEMBER_CRF_REQUEST,
  CALCULATE_MEMBER_CRF_REQUEST,
  CALCULATE_MEMBER_CRF_SUCCESS,
  CALCULATE_MEMBER_CRF_ERROR,
} = memberCRFTypes;

const { Types, Creators } = createActions({
  getMemberCRFRequest: [],
  getMemberCRFSuccess: null,
  getMemberCRFError: null,
  calculateMemberCRFRequest: ['member_id'],
  calculateMemberCRFSuccess: null,
  calculateMemberCRFError: null,
});

export default Creators;

export const INITIAL_STATE = {
  member_crfs: {},
  fetching: false,
  error: null,
};

const request = (state) => {
  return {
    ...state,
    fetching: true,
  };
};

const success = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    member_crfs: data,
  };
};

const failure = (state, { error }) => {
  return {
    ...state,
    fetching: false,
    error,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_MEMBER_CRF_REQUEST]: request,
  [GET_MEMBER_CRF_SUCCESS]: success,
  [GET_MEMBER_CRF_ERROR]: failure,
  [CALCULATE_MEMBER_CRF_REQUEST]: request,
  [CALCULATE_MEMBER_CRF_SUCCESS]: success,
  [CALCULATE_MEMBER_CRF_ERROR]: failure,
});
