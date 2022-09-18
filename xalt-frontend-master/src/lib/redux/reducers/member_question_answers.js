import { createReducer, createActions } from 'reduxsauce';

import memberQuestionAnswersType from 'lib/redux/types/member_question_answers';

const {
  GET_MEMBER_QUESTION_ANSWERS_SUCCESS,
  GET_MEMBER_QUESTION_ANSWERS_ERROR,
  GET_MEMBER_QUESTION_ANSWERS_REQUEST,
  ADD_MEMBER_QUESTION_ANSWERS_REQUEST,
  CREATE_MEMBER_QUESTION_ANSWERS_SUCCESS,
  CREATE_MEMBER_QUESTION_ANSWERS_ERROR,
  UPDATE_MEMBER_QUESTION_ANSWERS_REQUEST,
  UPDATE_MEMBER_QUESTION_ANSWERS_SUCCESS,
  UPDATE_MEMBER_QUESTION_ANSWERS_ERROR,
  DELETE_MEMBER_QUESTION_ANSWERS_REQUEST,
  DELETE_MEMBER_QUESTION_ANSWERS_SUCCESS,
  DELETE_MEMBER_QUESTION_ANSWERS_ERROR,
} = memberQuestionAnswersType;

const { Types, Creators } = createActions({
  getMemberQuestionAnswersRequest: ['member_id'],
  getMemberQuestionAnswersSuccess: null,
  getMemberQuestionAnswersError: null,
  addMemberQuestionAnswersRequest: ['body', 'member_id'],
  addMemberQuestionAnswersSuccess: null,
  addMemberQuestionAnswersError: null,
  updateMemberQuestionAnswersRequest: ['body', 'id'],
  updateMemberQuestionAnswersSuccess: null,
  updateMemberQuestionAnswersError: null,
  deleteMemberQuestionAnswersRequest: ['answer_id'],
  deleteMemberQuestionAnswersSuccess: null,
  deleteMemberQuestionAnswersError: null,
});

export default Creators;

export const INITIAL_STATE = {
  member_answers: {},
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
    member_answers: {
      ...data,
    },
  };
};

const updateSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    member_answers: {
      ...data,
    },
  };
};

const failure = (state, { error }) => {
  return {
    ...state,
    fetching: false,
    error,
  };
};

const deleteMemberQuestionAnaswersSuccess = (state, {}) => {
  return {
    ...state,
    fetching: false,
    member_answers: {},
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_MEMBER_QUESTION_ANSWERS_REQUEST]: request,
  [GET_MEMBER_QUESTION_ANSWERS_SUCCESS]: success,
  [GET_MEMBER_QUESTION_ANSWERS_ERROR]: failure,
  [ADD_MEMBER_QUESTION_ANSWERS_REQUEST]: request,
  [CREATE_MEMBER_QUESTION_ANSWERS_SUCCESS]: success,
  [CREATE_MEMBER_QUESTION_ANSWERS_ERROR]: failure,
  [UPDATE_MEMBER_QUESTION_ANSWERS_REQUEST]: request,
  [UPDATE_MEMBER_QUESTION_ANSWERS_SUCCESS]: updateSuccess,
  [UPDATE_MEMBER_QUESTION_ANSWERS_ERROR]: failure,
  [DELETE_MEMBER_QUESTION_ANSWERS_REQUEST]: request,
  [DELETE_MEMBER_QUESTION_ANSWERS_SUCCESS]: deleteMemberQuestionAnaswersSuccess,
  [DELETE_MEMBER_QUESTION_ANSWERS_ERROR]: failure,
});
