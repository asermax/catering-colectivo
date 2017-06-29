import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import {
  receiveEvents, failReceiveEvents, EVENTS_FETCH_REQUEST,
  receiveEvent, failReceiveEvent, EVENT_FETCH_REQUEST,
} from './actions'
import { allEventsQuery, eventQuery } from './queries'

function* fetchEvents() {
  try {
    const response = yield call(api.query, allEventsQuery)
    yield put(receiveEvents(response.events))
  } catch(error) {
    yield put(failReceiveEvents(error.mesage))
  }
}

function* fetchEvent(action) {
  try {
    const response = yield call(api.query, eventQuery, { id: action.id })
    yield put(receiveEvent(response.event))
  } catch(error) {
    yield put(failReceiveEvent(error.mesage))
  }
}

function* eventSaga() {
  yield [
    takeLatest(EVENTS_FETCH_REQUEST, fetchEvents),
    takeLatest(EVENT_FETCH_REQUEST, fetchEvent),
  ]
}

export default eventSaga
