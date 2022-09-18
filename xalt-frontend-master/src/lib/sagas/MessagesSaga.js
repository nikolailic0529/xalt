import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import messagesTypes from 'lib/redux/types/messages';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

const {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATIONS_ERROR,
  UPDATE_CONVERSATION_REQUEST,
  UPDATE_CONVERSATIONS_SUCCESS,
  UPDATE_CONVERSATION_ERROR,
  SET_CHAT_MESSAGES,
} = messagesTypes;

const { SHOW_ERROR } = notificationTypes;

function* getMessages(action) {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/messages', { query: { conversation_id: action.conversationId } });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t receive the list of messages') });

    return yield put({ type: GET_MESSAGES_ERROR, error: errorHandler(error, 'Can\'t receive the list of messages') });
  }

  if (response.status === 200) {
    yield put({ type: SET_CHAT_MESSAGES, data: response.data, flush: true });

    return yield put({ type: GET_MESSAGES_SUCCESS });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_MESSAGES_ERROR, error: 'Please, try again later' });
}

function* sendMessage(action) {
  let response = null;

  try {
    response = yield call(api.post, '/api/v1/messages', { body: action.data });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t send the message') });

    return yield put({ type: SEND_MESSAGE_ERROR, error: errorHandler(error, 'Can\'t send the message') });
  }

  if (response.status === 200) {
    return yield put({
      type: SEND_MESSAGE_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: SEND_MESSAGE_ERROR, error: 'Please, try again later' });
}

function* getConversations() {
  let response = null;

  try {
    response = yield call(api.get, '/api/v1/conversations', { query: { include: 'users,messages,read_marks' } });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t receive the list of conversations') });

    return yield put({ type: GET_CONVERSATIONS_ERROR, error: errorHandler(error, 'Can\'t receive the list of conversations') });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_CONVERSATION_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: GET_CONVERSATIONS_ERROR, error: 'Please, try again later' });
}

function* updateConversation(action) {
  let response = null;

  try {
    response = yield call(api.put, `/api/v1/conversations/${action.conversationId}`, { body: { mark_as_read: true } });
  } catch (error) {
    yield put({ type: SHOW_ERROR, error: errorHandler(error, 'Can\'t update the conversation') });

    return yield put({ type: UPDATE_CONVERSATION_ERROR, error: errorHandler(error, 'Can\'t update the conversation') });
  }

  if (response.status === 200) {
    return yield put({
      type: UPDATE_CONVERSATIONS_SUCCESS,
    });
  }

  yield put({ type: SHOW_ERROR, error: 'Please, try again later' });
  return yield put({ type: UPDATE_CONVERSATION_ERROR, error: 'Please, try again later' });
}

export default function* watch() {
  yield all([
    takeEvery(GET_MESSAGES_REQUEST, getMessages),
    takeEvery(SEND_MESSAGE_REQUEST, sendMessage),
    takeEvery(GET_CONVERSATIONS_REQUEST, getConversations),
    takeEvery(UPDATE_CONVERSATION_REQUEST, updateConversation),
  ]);
}
