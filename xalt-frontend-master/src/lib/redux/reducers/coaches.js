import { createReducer, createActions } from 'reduxsauce';

import coachesTypes from 'lib/redux/types/coaches';

const {
  GET_COACHES_REQUEST,
  GET_COACHES_SUCCESS,
  GET_COACHES_ERROR,
  CLEANUP_COACHES,
} = coachesTypes;

const { Types, Creators } = createActions({
  getCoachesRequest: ['page', 'per_page', 'coachType'],
  getCoachesSuccess: null,
  getCoachesError: null,
  cleanupCoaches: null,
});

export default Creators;

export const INITIAL_STATE = {
  coaches: [],
  fetching: false,
  error: null,
  isLimit: false,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (state, { data }) => {
  // const newCoaches = [
  //   ...state.coaches,
  //   ...data.filter((item) => item.id !== state.coaches.find((coach) => coach.id === item.id)?.id),
  // ];
  // if (newCoaches.length !== state.coaches.length) {
  //   return ({
  //     ...state,
  //     fetching: false,
  //     isLimit: false,
  //     coaches: newCoaches,
  //   });
  // } if (!data.length) {
  //   return {
  //     ...state,
  //     fetching: false,
  //     isLimit: true,
  //   };
  // }
  return {
    ...state,
    coaches: data,
    isLimit: !data.length,
    fetching: false,
  };
};

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_COACHES_REQUEST]: request,
  [GET_COACHES_SUCCESS]: success,
  [GET_COACHES_ERROR]: failure,
  [CLEANUP_COACHES]: cleanup,
});
