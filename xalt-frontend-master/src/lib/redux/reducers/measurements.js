import { createReducer, createActions } from 'reduxsauce';

import measurementsTypes from 'lib/redux/types/measurements';
import measurements from '../types/measurements';

const {
  GET_ALL_MEASUREMENTS_REQUEST,
  GET_ALL_MEASUREMENTS_SUCCESS,
  GET_ALL_MEASUREMENTS_ERROR,
  CREATE_NEW_MEASUREMENT_REQUEST,
  CREATE_NEW_MEASUREMENT_SUCCESS,
  CREATE_NEW_MEASUREMENT_ERROR,
  UPDATE_MEASUREMENT_REQUEST,
  UPDATE_MEASUREMENT_SUCCESS,
  UPDATE_MEASUREMENT_ERROR,
  CLEANUP_MEASUREMENTS,
} = measurementsTypes;

const { Types, Creators } = createActions({
  getAllMeasurementsRequest: ['id'],
  getAllMeasurementsSuccess: null,
  getAllMeasurementsError: null,
  createNewMeasurementRequest: ['data'],
  createNewMeasurementSuccess: null,
  createNewMeasurementError: null,
  updateMeasurementRequest: ['data'],
  updateMeasurementSuccess: null,
  updateMeasurementError: null,
});

export default Creators;

export const INITIAL_STATE = {
  measurements: [],
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
  error: null,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: error,
});

const getAllMeasurementsSuccess = (state, { data }) => {
  return {
    ...state,
    measurements: data,
    fetching: false,
    error: null,
  };
};

const createNewMeasurementSuccess = (state, { data }) => {
  return {
    ...state,
    measurements: [...state.measurements, data],
    fetching: false,
    error: null,
  };
};

const updateChallengeSuccess = (state, { data }) => {
  return {
    ...state,
    measurements: measurements.map((measurement) => {
      if (measurement.id == data.id) {
        return data;
      }
      return measurement;
    }),
    fetching: false,
    error: null,
  };
};

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_ALL_MEASUREMENTS_REQUEST]: request,
  [GET_ALL_MEASUREMENTS_SUCCESS]: getAllMeasurementsSuccess,
  [GET_ALL_MEASUREMENTS_ERROR]: failure,
  [CREATE_NEW_MEASUREMENT_REQUEST]: request,
  [CREATE_NEW_MEASUREMENT_SUCCESS]: createNewMeasurementSuccess,
  [CREATE_NEW_MEASUREMENT_ERROR]: failure,
  [UPDATE_MEASUREMENT_REQUEST]: request,
  [UPDATE_MEASUREMENT_SUCCESS]: updateChallengeSuccess,
  [UPDATE_MEASUREMENT_ERROR]: failure,
  [CLEANUP_MEASUREMENTS]: cleanup,
});
