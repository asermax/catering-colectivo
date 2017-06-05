export const EVENT_FETCH_REQUEST = 'EVENT_FETCH_REQUEST'
export const EVENT_FETCH_SUCCESS = 'EVENT_FETCH_SUCCESS'
export const EVENT_FETCH_FAILURE = 'EVENT_FETCH_FAILURE'

export const fetchEvents = () => ({
  type: EVENT_FETCH_REQUEST,
})

export const receiveEvents = (events) => ({
  type: EVENT_FETCH_SUCCESS,
  events,
})

export const failReceiveEvents = () => ({
  type: EVENT_FETCH_FAILURE,
})
