import { createReducer, createActions } from 'reduxsauce';

import memberRecommendationTypes from 'lib/redux/types/member_recommendations';

const {
  GET_MEMBER_RECOMMENDATION_SUCCESS,
  GET_MEMBER_RECOMMENDATION_ERROR,
  GET_MEMBER_RECOMMENDATION_REQUEST,
} = memberRecommendationTypes;

const { Types, Creators } = createActions({
  getMemberRecommendationRequest: ['member_id'],
  getMemberRecommendationSuccess: null,
  getMemberRecommendationError: null,
});

export default Creators;

export const INITIAL_STATE = {
  member_recommendations: {},
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
    member_recommendations: data,
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
  [GET_MEMBER_RECOMMENDATION_REQUEST]: request,
  [GET_MEMBER_RECOMMENDATION_SUCCESS]: success,
  [GET_MEMBER_RECOMMENDATION_ERROR]: failure,
});
