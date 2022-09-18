import { createReducer, createActions } from 'reduxsauce';

import documentsTypes from 'lib/redux/types/documents';

const {
  GET_DOCUMENTS_REQUEST,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_ERROR,
  ADD_DOCUMENT_REQUEST,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_ERROR,
  UPDATE_DOCUMENT_REQUEST,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_ERROR,
  DELETE_DOCUMENT_REQUEST,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_ERROR,
} = documentsTypes;

const { Types, Creators } = createActions({
  getDocumentsRequest: null,
  getDocumentsSuccess: null,
  getDocumentsError: null,
  addDocumentRequest: ['data'],
  addDocumentSuccess: null,
  addDocumentError: null,
  updateDocumentRequest: ['data'],
  updateDocumentSuccess: null,
  updateDocumentError: null,
  deleteDocumentRequest: ['id'],
  deleteDocumentSuccess: null,
  deleteDocumentError: null,
});

export default Creators;

export const INITIAL_STATE = {
  documents: [],
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
  documents: data,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [GET_DOCUMENTS_REQUEST]: request,
  [GET_DOCUMENTS_SUCCESS]: success,
  [GET_DOCUMENTS_ERROR]: failure,
  [ADD_DOCUMENT_REQUEST]: request,
  [ADD_DOCUMENT_SUCCESS]: success,
  [ADD_DOCUMENT_ERROR]: failure,
  [UPDATE_DOCUMENT_REQUEST]: request,
  [UPDATE_DOCUMENT_SUCCESS]: success,
  [UPDATE_DOCUMENT_ERROR]: failure,
  [DELETE_DOCUMENT_REQUEST]: request,
  [DELETE_DOCUMENT_SUCCESS]: success,
  [DELETE_DOCUMENT_ERROR]: failure,
});
