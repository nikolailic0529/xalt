import { createReducer, createActions } from 'reduxsauce';

import subscriptionTypes from 'lib/redux/types/subscriptions';

const {
  GET_SUBSCRIPTIONS_REQUEST,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  CLEANUP_SUBSCRIPTIONS,
} = subscriptionTypes;
 
const { Types, Creators } = createActions({
  getSubscriptionsRequest: null,
  getSubscriptionsSuccess: null,
  getSubscriptionsError: null,
  cleanupSubscriptions: null,
});

export default Creators;

export const INITIAL_STATE = {
  subscriptions: [],
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
    subscriptions: data,
  };
};

const failure = (state, { error }) => {
  return {
    ...state,
    fetching: false,
    error,
  };
};

const cleanup = () => {
  return INITIAL_STATE;
}

export const reducer = createReducer(INITIAL_STATE, {
  [GET_SUBSCRIPTIONS_REQUEST]: request,
  [GET_SUBSCRIPTIONS_SUCCESS]: success,
  [GET_SUBSCRIPTIONS_ERROR]: failure,
  [CLEANUP_SUBSCRIPTIONS]: cleanup,
});
