export const EVENTS_FETCH_REQUEST = 'EVENTS_FETCH_REQUEST'
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS'
export const EVENTS_FETCH_FAILURE = 'EVENTS_FETCH_FAILURE'
export const EVENT_FETCH_REQUEST = 'EVENT_FETCH_REQUEST'
export const EVENT_FETCH_SUCCESS = 'EVENT_FETCH_SUCCESS'
export const EVENT_FETCH_FAILURE = 'EVENT_FETCH_FAILURE'
export const EVENT_DELETE_REQUEST = 'EVENT_DELETE_REQUEST'
export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS'
export const EVENT_DELETE_FAILURE = 'EVENT_DELETE_FAILURE'
export const EVENT_DETAIL_CREATE_REQUEST = 'EVENT_DETAIL_CREATE_REQUEST'
export const EVENT_DETAIL_CREATE_SUCCESS = 'EVENT_DETAIL_CREATE_SUCCESS'
export const EVENT_DETAIL_CREATE_FAILURE = 'EVENT_DETAIL_CREATE_FAILURE'
export const NEW_EVENT_DETAIL_CHANGE = 'NEW_EVENT_DETAIL_CHANGE'
export const EVENT_DETAIL_EDIT_REQUEST = 'EVENT_DETAIL_EDIT_REQUEST'
export const EVENT_DETAIL_EDIT_SUCCESS = 'EVENT_DETAIL_EDIT_SUCCESS'
export const EVENT_DETAIL_EDIT_FAILURE = 'EVENT_DETAIL_EDIT_FAILURE'
export const EDIT_EVENT_DETAIL_CHANGE = 'EDIT_EVENT_DETAIL_CHANGE'

export const fetchEvents = () => ({
  type: EVENTS_FETCH_REQUEST,
})

export const receiveEvents = (events) => ({
  type: EVENTS_FETCH_SUCCESS,
  events,
})

export const failReceiveEvents = (message) => ({
  type: EVENTS_FETCH_FAILURE,
  message,
})

export const fetchEvent = (id) => ({
  type: EVENT_FETCH_REQUEST,
  id,
})

export const receiveEvent = (event) => ({
  type: EVENT_FETCH_SUCCESS,
  event,
})

export const failReceiveEvent = (message) => ({
  type: EVENT_FETCH_FAILURE,
  message,
})

export const deleteEvent = (id) => ({
  type: EVENT_DELETE_REQUEST,
  id,
})

export const removeEvent = (id) => ({
  type: EVENT_DELETE_SUCCESS,
  id,
})

export const failRemoveEvent = (message) => ({
  type: EVENT_DELETE_FAILURE,
  message,
})

export const createEventDetail = (eventId, eventDetail) => ({
  type: EVENT_DETAIL_CREATE_REQUEST,
  eventId,
  eventDetail,
})

export const receiveEventDetail = (eventId, eventDetail) => ({
  type: EVENT_DETAIL_CREATE_SUCCESS,
  eventId,
  eventDetail,
})

export const failReceiveEventDetail = (message) => ({
  type: EVENT_DETAIL_CREATE_FAILURE,
  message,
})

export const changeNewEventDetail = (changes) => ({
  type: NEW_EVENT_DETAIL_CHANGE,
  changes,
})

export const editEventDetail = (eventId, id, eventDetail) => ({
  type: EVENT_DETAIL_EDIT_REQUEST,
  eventId,
  id,
  eventDetail,
})

export const updateEventDetail = (eventId, id, eventDetail) => ({
  type: EVENT_DETAIL_EDIT_SUCCESS,
  eventId,
  id,
  eventDetail,
})

export const failUpdateEventDetail = (message) => ({
  type: EVENT_DETAIL_EDIT_FAILURE,
  message,
})

export const changeEditingEventDetail = (changes) => ({
  type: EDIT_EVENT_DETAIL_CHANGE,
  changes,
})
