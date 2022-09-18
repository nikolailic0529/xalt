import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';

import api from 'lib/api';
import documentsTypes from 'lib/redux/types/documents';
import notificationTypes from 'lib/redux/types/notification';
import errorHandler from 'utils/errorHandler';

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

const { SHOW_ERROR } = notificationTypes;

function* getDocuments() {
  let response = null;
  try {
    response = yield call(api.get, '/api/v1/coach/coach_documents');
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't receive documents"),
    });
    return yield put({
      type: GET_DOCUMENTS_ERROR,
      error: errorHandler(error, "Can't receive documents"),
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_DOCUMENTS_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive documents" });
  return yield put({
    type: GET_DOCUMENTS_ERROR,
    error: "Can't receive documents",
  });
}

function* addDocument(action) {
  let response = null;
  try {
    response = yield call(api.post, '/api/v1/coach/coach_documents', { body: action.data });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't add documents"),
    });
    return yield put({
      type: ADD_DOCUMENT_ERROR,
      error: errorHandler(error, "Can't add documents"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: ADD_DOCUMENT_SUCCESS,
      data: response.data,
    });

    return yield call(getDocuments);
  }

  yield put({ type: SHOW_ERROR, error: "Can't add documents" });
  return yield put({
    type: ADD_DOCUMENT_ERROR,
    error: "Can't add documents",
  });
}

function* updateDocument({ data: { id, data } }) {
  let response = null;
  try {
    response = yield call(api.put, `/api/v1/coach/coach_documents/${id}`, { body: data });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't add documents"),
    });
    return yield put({
      type: UPDATE_DOCUMENT_ERROR,
      error: errorHandler(error, "Can't add documents"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: UPDATE_DOCUMENT_SUCCESS,
      data: response.data,
    });

    return yield call(getDocuments);
  }

  yield put({ type: SHOW_ERROR, error: "Can't add documents" });
  return yield put({
    type: UPDATE_DOCUMENT_ERROR,
    error: "Can't add documents",
  });
}

function* deleteDocument(action) {
  let response = null;
  try {
    response = yield call(api.delete, `/api/v1/coach/coach_documents/${action.id}`);
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: errorHandler(error, "Can't delete document"),
    });
    return yield put({
      type: DELETE_DOCUMENT_ERROR,
      error: errorHandler(error, "Can't delete document"),
    });
  }

  if (response.status === 200) {
    yield put({
      type: DELETE_DOCUMENT_SUCCESS,
      data: response.data,
    });

    return yield call(getDocuments);
  }

  yield put({ type: SHOW_ERROR, error: "Can't delete documents" });
  return yield put({
    type: DELETE_DOCUMENT_ERROR,
    error: "Can't add documents",
  });
}

export default function* watch() {
  yield all([
    takeEvery(GET_DOCUMENTS_REQUEST, getDocuments),
    takeEvery(ADD_DOCUMENT_REQUEST, addDocument),
    takeEvery(UPDATE_DOCUMENT_REQUEST, updateDocument),
    takeEvery(DELETE_DOCUMENT_REQUEST, deleteDocument),
  ]);
}
