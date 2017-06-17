import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import { receiveEvents, failReceiveEvents, EVENT_FETCH_REQUEST } from './actions'
import { allEventsQuery } from './queries'

function* fetchEvents() {
  try {
    const response = yield call(api.query, allEventsQuery)
    yield put(receiveEvents(response.events))
  } catch(error) {
    yield put(failReceiveEvents(error.mesage))
  }
}

function* eventSaga() {
  yield [
    takeLatest(EVENT_FETCH_REQUEST, fetchEvents),
  ]
}

export default eventSaga
