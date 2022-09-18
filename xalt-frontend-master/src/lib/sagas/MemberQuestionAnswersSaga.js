import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import memberQuestionAnswersType from 'lib/redux/types/member_question_answers';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

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

const { SHOW_ERROR, SHOW_SUCCESS } = notificationTypes;

function* getMemberQuestionAnswers(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/member/question_answer_for_member', {
      body: {
        member_id: action.member_id,
        type: 'get_answer',
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
    return yield put({
      type: GET_MEMBER_QUESTION_ANSWERS_ERROR,
      error: errorHandler(error, "Can't receive the info about this member"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_MEMBER_QUESTION_ANSWERS_SUCCESS,
      data: response.data,
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't receive the info about this member",
  });
  return yield put({
    type: GET_MEMBER_QUESTION_ANSWERS_ERROR,
    error: "Can't receive the info about this member",
  });
}

function* addMemberQuestionAnswers(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/member/member_question_answers', {
      body: {
        answer: { ...action.body },
        member_id: action.member_id,
        type: 'add_answer',
      },
    });
  } catch (error) {
    return yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't save answers for this member"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully saved answers!',
    });
    return yield put({
      type: CREATE_MEMBER_QUESTION_ANSWERS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't save answers for this member" });
  return yield put({
    type: CREATE_MEMBER_QUESTION_ANSWERS_ERROR,
    error: "Can't save answers for this member",
  });
}

function* updateMemberQuestionAnswers(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/member/member_question_answers/${action.id}`, {
      body: {
        answer: { ...action.body },
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't update answers for this member"),
    });
    return yield put({
      type: UPDATE_MEMBER_QUESTION_ANSWERS_ERROR,
      error: errorHandler(error, "Can't update answers for this member"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: SHOW_SUCCESS,
      success: 'Successfully saved answers!',
    });
    return yield put({
      type: UPDATE_MEMBER_QUESTION_ANSWERS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't update answers for this member" });
  return yield put({
    type: UPDATE_MEMBER_QUESTION_ANSWERS_ERROR,
    error: "Can't update answers for this member",
  });
}

function* deleteMemberQuestionAnswers(action) {
  const { answer_id } = action;
  let response = null;

  try {
    response = yield call(api.delete, `/api/v1/member/member_question_answers/${answer_id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't delete answers from this program"),
    });
    return yield put({
      type: DELETE_MEMBER_QUESTION_ANSWERS_ERROR,
      error: errorHandler(error, "Can't delete answers from this program"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: DELETE_MEMBER_QUESTION_ANSWERS_SUCCESS,
      data: { answer_id },
    });
  }

  yield put({
    type: SHOW_ERROR,
    error: "Can't delete answers from this program",
  });
  return yield put({
    type: DELETE_MEMBER_QUESTION_ANSWERS_ERROR,
    error: "Can't delete answers from this program",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_MEMBER_QUESTION_ANSWERS_REQUEST, getMemberQuestionAnswers),
    takeEvery(ADD_MEMBER_QUESTION_ANSWERS_REQUEST, addMemberQuestionAnswers),
    takeEvery(UPDATE_MEMBER_QUESTION_ANSWERS_REQUEST, updateMemberQuestionAnswers),
    takeEvery(DELETE_MEMBER_QUESTION_ANSWERS_REQUEST, deleteMemberQuestionAnswers),
  ]);
}
