import { createReducer, createActions } from 'reduxsauce';

import membersTypes from 'lib/redux/types/members';

const {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  CLEANUP_MEMBERS,
} = membersTypes;

const { Types, Creators } = createActions({
  getMembersRequest: ['filters'],
  getMembersSuccess: null,
  getMembersError: null,
  cleanupMembers: null,
});

export default Creators;

export const INITIAL_STATE = {
  members: [],
  fetching: false,
  error: null,
  isLimit: false,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (state, { data }) => {
  const newMembers = [
    ...state.members,
    ...data.filter((item) => item.id !== state.members.find((member) => member.id === item.id)?.id),
  ];
  if (newMembers.length !== state.members.length) {
    return ({
      ...state,
      fetching: false,
      isLimit: false,
      members: newMembers,
    });
  } if (!data.length) {
    return ({
      ...state,
      fetching: false,
      isLimit: true,
    });
  } return ({
    ...state,
    fetching: false,
  });
};

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_MEMBERS_REQUEST]: request,
  [GET_MEMBERS_SUCCESS]: success,
  [GET_MEMBERS_ERROR]: failure,
  [CLEANUP_MEMBERS]: cleanup,
});
