import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import { receiveEvents, failReceiveEvents, EVENT_FETCH_REQUEST } from './actions'

const EVENT_ENTRYPOINT = 'event'

function* fetchEvents() {
  try {
    const events = yield call(api.fetch, EVENT_ENTRYPOINT)
    yield put(receiveEvents(events))
  } catch(e) {
    yield put(failReceiveEvents())
  }
}

function* eventSaga() {
  yield [
    takeLatest(EVENT_FETCH_REQUEST, fetchEvents),
  ]
}

export default eventSaga
