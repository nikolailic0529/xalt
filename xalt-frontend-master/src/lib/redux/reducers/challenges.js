import { createReducer, createActions } from 'reduxsauce';

import challengesTypes from 'lib/redux/types/challenges';

const {
  RESET_STATE_REQUEST,
  RESET_STATE_SUCCESS,
  RESET_STATE_ERROR,
  GET_TOP_CHALLENGES_REQUEST,
  GET_TOP_CHALLENGES_SUCCESS,
  GET_TOP_CHALLENGES_ERROR,
  GET_MY_CHALLENGES_REQUEST,
  GET_MY_CHALLENGES_SUCCESS,
  GET_MY_CHALLENGES_ERROR,
  GET_ENROLLED_CHALLENGES_REQUEST,
  GET_ENROLLED_CHALLENGES_SUCCESS,
  GET_ENROLLED_CHALLENGES_ERROR,
  CLEANUP_CHALLENGES,
  ADD_CHALLENGE_REQUEST,
  ADD_CHALLENGE_SUCCESS,
  ADD_CHALLENGE_ERROR,
  REMOVE_CHALLENGE_REQUEST,
  REMOVE_CHALLENGE_SUCCESS,
  REMOVE_CHALLENGE_ERROR,
  GET_CHALLENGE_REQUEST,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
  UPDATE_CHALLENGE_REQUEST,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_ERROR,
  VOTE_CHALLENGE_REQUEST,
  VOTE_CHALLENGE_SUCCESS,
  VOTE_CHALLENGE_ERROR,
  UNVOTE_CHALLENGE_REQUEST,
  UNVOTE_CHALLENGE_SUCCESS,
  UNVOTE_CHALLENGE_ERROR,
  ENROLL_IN_CHALLENGE_REQUEST,
  ENROLL_IN_CHALLENGE_SUCCESS,
  ENROLL_IN_CHALLENGE_ERROR,
  UNENROLL_IN_CHALLENGE_REQUEST,
  UNENROLL_IN_CHALLENGE_SUCCESS,
  UNENROLL_IN_CHALLENGE_ERROR,
  CANCEL_CHALLENGE_REQUEST,
  CANCEL_CHALLENGE_SUCCESS,
  CANCEL_CHALLENGE_ERROR,
  CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST,
  CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
  CREATE_CHECK_IN_FOR_CHALLENGE_ERROR,
  UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST,
  UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
  UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR,
  GET_CHECK_INS_FOR_CHALLENGE_REQUEST,
  GET_CHECK_INS_FOR_CHALLENGE_SUCCESS,
  GET_CHECK_INS_FOR_CHALLENGE_ERROR,
  GET_CHECK_INS_FOR_USER_REQUEST,
  GET_CHECK_INS_FOR_USER_SUCCESS,
  GET_CHECK_INS_FOR_USER_ERROR,
  SET_CURRENT_CHALLENGE_REQUEST,
  SET_CURRENT_CHALLENGE_SUCCESS,
  SET_CURRENT_CHALLENGE_ERROR,
  GET_SEARCHED_CHALLENGES_REQUEST,
  GET_SEARCHED_CHALLENGES_SUCCESS,
  GET_SEARCHED_CHALLENGES_ERROR,
} = challengesTypes;

const { Types, Creators } = createActions({
  resetStateRequest: null,
  resetStateSuccess: null,
  resetStateError: null,
  getTopChallengesRequest: ['filters'],
  getTopChallengesSuccess: null,
  getTopChallengesError: null,
  getMyChallengesRequest: ['filters'],
  getMyChallengesSuccess: null,
  getMyChallengesError: null,
  getSearchedChallengesRequest: ['filters'],
  getSearchedChallengesSuccess: null,
  getSearchedChallengesError: null,
  addChallengeRequest: ['challenge'],
  addChallengeSuccess: null,
  addChallengeError: null,
  removeChallengeRequest: ['id'],
  removeChallengeSuccess: null,
  removeChallengeError: null,
  getChallengeRequest: ['id'],
  getChallengeSuccess: null,
  getChallengeError: null,
  updateChallengeRequest: ['id', 'challenge'],
  updateChallengeSuccess: null,
  updateChallengeError: null,
  voteChallengeRequest: ['data'],
  voteChallengeSuccess: null,
  voteChallengeError: null,
  unvoteChallengeRequest: ['id'],
  unvoteChallengeSuccess: null,
  unvoteChallengeError: null,
  enrollInChallengeRequest: ['data'],
  enrollInChallengeSuccess: null,
  enrollInChallengeError: null,
  unenrollInChallengeRequest: ['data'],
  unenrollInChallengeSuccess: null,
  unenrollInChallengeError: null,
  cancelChallengeRequest: ['id'],
  cancelChallengeSuccess: null,
  cancelChallengeError: null,
  getEnrolledChallengesRequest: ['filters'],
  getEnrolledChallengesSuccess: null,
  getEnrolledChallengesError: null,
  createCheckInForChallengeRequest: ['data'],
  createCheckInForChallengeSuccess: null,
  createCheckInForChallengeError: null,
  updateCheckInForChallengeRequest: ['data'],
  updateCheckInForChallengeSuccess: null,
  updateCheckInForChallengeError: null,
  getCheckInsForChallengeRequest: ['filters'],
  getCheckInsForChallengeSuccess: null,
  getCheckInsForChallengeError: null,
  getCheckInsForUserRequest: ['filters'],
  getCheckInsForUserSuccess: null,
  getCheckInsForUserError: null,
  setCurrentChallengeRequest: ['data'],
  setCurrentChallengeSuccess: null,
  setCurrentChallengeError: null,
  cleanupChallenges: null,
});

export default Creators;

export const INITIAL_STATE = {
  myChallenges: [],
  enrolledChallenges: [],
  topChallenges: [],
  searchResults: [],
  currentChallenge: null,
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

const resetStateSuccess = (state, data) => {
  return INITIAL_STATE;
}

const getTopChallengesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: null,
    topChallenges: data,
  };
};

const getEnrolledChallengesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: null,
    enrolledChallenges: data,
  };
};

const getMyChallengesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: null,
    myChallenges: data,
  };
};

const getSearchedChallengesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: null,
    searchResults: data,
  };
};

const getChallengeSuccess = (state, { data }) => {
  // when you get a challenge, update the list entry with the most
  // updated information
  state.myChallenges = state.myChallenges.map((challenge) => {
    if (challenge.id == data.id) {
      return data;
    } else {
      return challenge;
    }
  });
  state.topChallenges = state.topChallenges.map((challenge) => {
    if (challenge.id == data.id) {
      return data;
    } else {
      return challenge;
    }
  });
  state.enrolledChallenges = state.enrolledChallenges.map((challenge) => {
    if (challenge.id == data.id) {
      return data;
    } else {
      return challenge;
    }
  });
  return {
    ...state,
    currentChallenge: data,
    fetching: false,
    error: null,
  };
};

const addChallengeSuccess = (state, { data }) => {
  return {
    ...state,
    myChallenges: [...state.myChallenges, data],
    fetching: false,
    error: null,
  };
};

const updateChallengeSuccess = (state, { data }) => {
  state.myChallenges = state.myChallenges.map((challenge) => {
    if (challenge.id == data.id) {
      return data;
    }
    return challenge;
  });

  state.enrolledChallenges = state.enrolledChallenges.map((challenge) => {
    if (challenge.id == data.id) {
      return data;
    }
    return challenge;
  });

  return {
    ...state,
    currentChallenge: data,
    fetching: false,
    error: null,
  };
};

const enrollInChallengeSuccess = (state, { data }) => {
  const current_challenge = state.currentChallenge;
  current_challenge.user_member_challenges = [
    ...state.currentChallenge.user_member_challenges,
    data,
  ];
  state.enrolledChallenges = [...state.enrolledChallenges, current_challenge];

  state.topChallenges = state.topChallenges.map((challenge) => {
    if (challenge.id == current_challenge.id) {
      return current_challenge;
    }
    return challenge;
  });

  state.myChallenges = state.myChallenges.map((challenge) => {
    if (challenge.id == current_challenge.id) {
      return current_challenge;
    }
    return challenge;
  });

  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const unenrollInChallengeSuccess = (state, { data }) => {
  state.enrolledChallenges = state.enrolledChallenges.filter((challenge) => {
    return challenge.id != data.member_challenge_id;
  });

  state.topChallenges = state.topChallenges.map((challenge) => {
    if (challenge.id == data.user_id) {
      challenge.user_member_challenges = challenge.user_member_challenges.filter(
        (user_member_challenge) => {
          return user_member_challenge.user_id != data.user_id;
        },
      );
    }
    return challenge;
  });

  state.myChallenges = state.myChallenges.map((challenge) => {
    if (challenge.id == data.user_id) {
      challenge.user_member_challenges = challenge.user_member_challenges.filter(
        (user_member_challenge) => {
          return user_member_challenge.user_id != data.user_id;
        },
      );
    }
    return challenge;
  });

  state.currentChallenge.user_member_challenges =
    state.currentChallenge.user_member_challenges.filter((user_member_challenge) => {
      return user_member_challenge.user_id != data.user_id;
    });

  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const createCheckInForChallengeSuccess = (state, {data}) => {
  state.currentChallenge.user_member_challenge_check_ins.push(data);
  state.enrolledChallenges = state.enrolledChallenges.map((challenge) => {
    if (challenge.id == data.member_challenge_id) {
      return state.currentChallenge;
    } else {
      return challenge;
    }
  });
  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const updateCheckInForChallengeSuccess = (state, {data}) => {
  // If none where successfully update
  if (!data.updated || data.updated == []) {
    return {
      ...state,
      fetching: false,
      error: null,
    };
  }

  // update current challenge with new check-ins
  state.currentChallenge.user_member_challenge_check_ins =
    state.currentChallenge.user_member_challenge_check_ins.map((check_in) => {
      var new_checkin = data.updated.find((val) => {
        val.id == check_in.id;
      });
      if (new_checkin) {
        return new_checkin;
      } else {
        return check_in;
      }
    });

  // update enrolled list with new data
  state.enrolledChallenges = state.enrolledChallenges.map((challenge) => {
    if (challenge.id == state.currentChallenge.id) {
      return state.currentChallenge;
    } else {
      return challenge;
    }
  });

  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const getCheckInsForChallengeSuccess = (state, data) => {
  if (!data || data == []) {
    return {
      ...state,
      fetching: false,
      error: null,
    };
  }
  state.currentChallenge.user_member_challenge_check_ins = data;
  // update enrolled list with new data
  state.enrolledChallenges = state.enrolledChallenges.map((challenge) => {
    if (challenge.id == state.currentChallenge.id) {
      return state.currentChallenge;
    } else {
      return challenge;
    }
  });
  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const getCheckInsForUserSuccess = (state, data) => {
  // TODO: CURRENTLY NOT IMPLEMENTED
  // filter the list and replace old checkins that belong
  // to the user with new ones and append new ones if they exist
  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const setCurrentChallengeSuccess = (state, { data }) => {
  return {
    ...state,
    currentChallenge: data,
    fetching: false,
    error: null,
  };
};

// const getEnrolledChallengesSuccess = (state, { data }) => ({
//   ...state,
//   fetching: false,
//   error: null,
//   challenges: {
//     ...state.challenges,
//     enrolled: [...state.challenges.user_member_challenges, data]
//   }
// });

// const voteChallengeSuccess = (state, { data }) => ({
//   ...state,
//   fetching: false,
//   error: null,
//   challenge: {
//     ...state.challenge,
//     vote_record: [...state.challenges.vote_record, data],
//   },
// });

// const unvoteChallengeSuccess = (state, { data }) => ({
//   ...state,
//   fetching: false,
//   error: null,
//   challenge: {
//     ...state.challenge,
//     vote_record: state.challenges.vote_record.filter((vote) => vote.id !== data.id),
//   },
// });

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_TOP_CHALLENGES_REQUEST]: request,
  [GET_TOP_CHALLENGES_SUCCESS]: getTopChallengesSuccess,
  [GET_TOP_CHALLENGES_ERROR]: failure,
  [GET_MY_CHALLENGES_REQUEST]: request,
  [GET_MY_CHALLENGES_SUCCESS]: getMyChallengesSuccess,
  [GET_MY_CHALLENGES_ERROR]: failure,
  [ADD_CHALLENGE_REQUEST]: request,
  [ADD_CHALLENGE_SUCCESS]: addChallengeSuccess,
  [ADD_CHALLENGE_ERROR]: failure,
  [REMOVE_CHALLENGE_REQUEST]: request,
  [REMOVE_CHALLENGE_SUCCESS]: success,
  [REMOVE_CHALLENGE_ERROR]: failure,
  [GET_CHALLENGE_REQUEST]: request,
  [GET_CHALLENGE_SUCCESS]: getChallengeSuccess,
  [GET_CHALLENGE_ERROR]: failure,
  [UPDATE_CHALLENGE_REQUEST]: request,
  [UPDATE_CHALLENGE_SUCCESS]: updateChallengeSuccess,
  [UPDATE_CHALLENGE_ERROR]: failure,
  // [VOTE_CHALLENGE_REQUEST]: request,
  // [VOTE_CHALLENGE_SUCCESS]: voteChallengeSuccess,
  // [VOTE_CHALLENGE_ERROR]: failure,
  // [UNVOTE_CHALLENGE_REQUEST]: request,
  // [UNVOTE_CHALLENGE_SUCCESS]: unvoteChallengeSuccess,
  // [UNVOTE_CHALLENGE_ERROR]: failure,
  [ENROLL_IN_CHALLENGE_REQUEST]: request,
  [ENROLL_IN_CHALLENGE_SUCCESS]: enrollInChallengeSuccess,
  [ENROLL_IN_CHALLENGE_ERROR]: failure,
  [UNENROLL_IN_CHALLENGE_REQUEST]: request,
  [UNENROLL_IN_CHALLENGE_SUCCESS]: unenrollInChallengeSuccess,
  [UNENROLL_IN_CHALLENGE_ERROR]: failure,
  [CANCEL_CHALLENGE_REQUEST]: request,
  [CANCEL_CHALLENGE_SUCCESS]: success,
  [CANCEL_CHALLENGE_ERROR]: failure,
  [GET_ENROLLED_CHALLENGES_REQUEST]: request,
  [GET_ENROLLED_CHALLENGES_SUCCESS]: getEnrolledChallengesSuccess,
  [GET_ENROLLED_CHALLENGES_ERROR]: failure,
  [CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST]: request,
  [CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS]: createCheckInForChallengeSuccess,
  [CREATE_CHECK_IN_FOR_CHALLENGE_ERROR]: failure,
  [UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST]: request,
  [UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS]: updateCheckInForChallengeSuccess,
  [UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR]: failure,
  [GET_CHECK_INS_FOR_CHALLENGE_REQUEST]: request,
  [GET_CHECK_INS_FOR_CHALLENGE_SUCCESS]: getCheckInsForChallengeSuccess,
  [GET_CHECK_INS_FOR_CHALLENGE_ERROR]: failure,
  [GET_CHECK_INS_FOR_USER_REQUEST]: request,
  [GET_CHECK_INS_FOR_USER_SUCCESS]: getCheckInsForUserSuccess,
  [GET_CHECK_INS_FOR_USER_ERROR]: failure,
  [SET_CURRENT_CHALLENGE_REQUEST]: request,
  [SET_CURRENT_CHALLENGE_SUCCESS]: setCurrentChallengeSuccess,
  [SET_CURRENT_CHALLENGE_ERROR]: failure,
  [CLEANUP_CHALLENGES]: cleanup,
  [GET_SEARCHED_CHALLENGES_REQUEST]: request,
  [GET_SEARCHED_CHALLENGES_SUCCESS]: getSearchedChallengesSuccess,
  [GET_SEARCHED_CHALLENGES_ERROR]: failure,
  [RESET_STATE_REQUEST]: request,
  [RESET_STATE_SUCCESS]: resetStateSuccess,
  [RESET_STATE_ERROR]: failure,
});
