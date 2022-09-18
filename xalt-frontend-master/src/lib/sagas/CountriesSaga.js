import { put, all, takeEvery } from 'redux-saga/effects';

import countriesTypes from 'lib/redux/types/countries';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';
import countries from 'countries-list';

const { GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_ERROR } = countriesTypes;
const { SHOW_ERROR } = notificationTypes;

function* getCountries() {
  let response = null;
  /*
  try {
    response = yield fetch('https://restcountries.eu/rest/v2/all');
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the list of countries"),
    });
    return yield put({
      type: GET_COUNTRIES_ERROR,
      error: errorHandler(error, "Can't receive the list of countries"),
    });
  }

  if (response.status === 200) {
    const data = yield response.json();
    return yield put({
      type: GET_COUNTRIES_SUCCESS,
      data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the list of countries" });
  return yield put({
    type: GET_COUNTRIES_ERROR,
    error: "Can't receive the list of countries",
  });
  */

  const countryCodes = Object.keys(countries.countries);
  const data = countryCodes.map((code) => {
    return {
      label: countries.countries[code].name,
      value: code,
    };
  });

  return yield put({
    type: GET_COUNTRIES_SUCCESS,
    data,
  });
}

export default function* watch() {
  yield all([takeEvery(GET_COUNTRIES_REQUEST, getCountries)]);
}
