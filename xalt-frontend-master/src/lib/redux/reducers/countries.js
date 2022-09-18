import { createReducer, createActions } from 'reduxsauce';

import countriesTypes from 'lib/redux/types/countries';

const { GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_ERROR, CLEANUP_COUNTRIES } =
  countriesTypes;

const { Types, Creators } = createActions({
  getCountriesRequest: null,
  getCountriesSuccess: null,
  getCountriesError: null,
  cleanupCountries: null,
});

export default Creators;

export const INITIAL_STATE = {
  countries: [],
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
  countries: data.map((item) => ({
    label: item.label,
    value: item.value,
  })),
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_COUNTRIES_REQUEST]: request,
  [GET_COUNTRIES_SUCCESS]: success,
  [GET_COUNTRIES_ERROR]: failure,
  [CLEANUP_COUNTRIES]: cleanup,
});
