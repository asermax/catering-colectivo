import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import {
  receiveEvents, failReceiveEvents, EVENTS_FETCH_REQUEST,
  receiveEvent, failReceiveEvent, EVENT_FETCH_REQUEST,
  removeEvent, failRemoveEvent, EVENT_DELETE_REQUEST,
  updateEventDetail, failUpdateEventDetail, EVENT_DETAIL_EDIT_REQUEST,
} from './actions'
import { allEventsQuery, eventQuery } from './queries'
import { deleteEventMutation, updateEventDetailMutation } from './mutations'

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

function* deleteEvent(action) {
  try {
    const response = yield call(api.mutate, deleteEventMutation, { id: action.id })

    if (response.deleted) {
      yield put(removeEvent(action.id))
    } else {
      yield put(failRemoveEvent('The event couldn\'t be deleted'))
    }
  } catch(error) {
    yield put(failRemoveEvent(error.message))
  }
}

function* editEventDetail(action) {
  try {
    const response = yield call(api.mutate, updateEventDetailMutation, {
      eventId: action.eventId,
      id: action.id,
      eventDetail: action.eventDetail ,
    })
    yield put(updateEventDetail(action.eventId, action.id, response.eventDetail))
  } catch(error) {
    yield put(failUpdateEventDetail(error.message))
  }
}

function* eventSaga() {
  yield [
    takeLatest(EVENTS_FETCH_REQUEST, fetchEvents),
    takeLatest(EVENT_FETCH_REQUEST, fetchEvent),
    takeLatest(EVENT_DELETE_REQUEST, deleteEvent),
    takeLatest(EVENT_DETAIL_EDIT_REQUEST, editEventDetail),
  ]
}

export default eventSaga
