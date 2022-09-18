import {createReducer, createActions} from 'reduxsauce';

import domainTypes from 'lib/redux/types/domains';

const {
  GET_FITNES_DOMAINS_REQUEST,
  GET_FITNES_DOMAINS_SUCCESS,
  GET_FITNES_DOMAINS_ERROR,
  CLEANUP_DOMAINS,
} = domainTypes;

const {Types, Creators} = createActions({
  getFitnesDomainsRequest: ['role'],
  getFitnesDomainsSuccess: null,
  getFitnesDomainsError: null,
  cleanupDomains: null,
});

export default Creators;

export const INITIAL_STATE = {
  domains: [],
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
    domains: data,
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
  [GET_FITNES_DOMAINS_REQUEST]: request,
  [GET_FITNES_DOMAINS_SUCCESS]: success,
  [GET_FITNES_DOMAINS_ERROR]: failure,
  [CLEANUP_DOMAINS]: cleanup,
});
