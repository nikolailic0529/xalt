import { createReducer, createActions } from 'reduxsauce';

import messagesTypes from 'lib/redux/types/messages';
import { sortBy } from 'lodash';

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
  CLEANUP_MESSAGES,
  SET_CHAT_MESSAGES,
} = messagesTypes;

const { Types, Creators } = createActions({
  getMessagesRequest: ['conversationId'],
  getMessagesSuccess: null,
  getMessagesError: null,
  sendMessageRequest: ['data'],
  sendMessageSuccess: null,
  sendMessageError: null,
  getConversationsRequest: [],
  getConversationsSuccess: null,
  getConversationsError: null,
  updateConversationRequest: ['conversationId'],
  updateConversationSuccess: null,
  updateConversationError: null,
});

export default Creators;

export const INITIAL_STATE = {
  conversations: [],
  chatMessages: [],
  fetching: false,
  error: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const getMessagesSuccess = (state) => ({
  ...state,
  fetching: false,
  error: null,
});

const sendMessageSuccess = (
  state,
) => ({
  ...state,
  fetching: false,
  error: null,
});

const getConversationsSuccess = (
  state,
  {
    data,
  },
) => ({
  ...state,
  fetching: false,
  error: null,
  conversations: data,
});

const updateConversationSuccess = (
  state,
) => ({
  ...state,
  fetching: false,
  error: null,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const setChatMessages = (state, { data, flush }) => ({
  ...state,
  fetching: false,
  chatMessages: sortBy(flush ? data : [...state.chatMessages, ...data], ['id']),
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_MESSAGES_REQUEST]: request,
  [GET_MESSAGES_SUCCESS]: getMessagesSuccess,
  [GET_MESSAGES_ERROR]: failure,
  [SEND_MESSAGE_REQUEST]: request,
  [SEND_MESSAGE_SUCCESS]: sendMessageSuccess,
  [SEND_MESSAGE_ERROR]: failure,
  [GET_CONVERSATIONS_REQUEST]: request,
  [GET_CONVERSATION_SUCCESS]: getConversationsSuccess,
  [GET_CONVERSATIONS_ERROR]: failure,
  [UPDATE_CONVERSATION_REQUEST]: request,
  [UPDATE_CONVERSATIONS_SUCCESS]: updateConversationSuccess,
  [UPDATE_CONVERSATION_ERROR]: failure,
  [CLEANUP_MESSAGES]: cleanup,
  [SET_CHAT_MESSAGES]: setChatMessages,
});
