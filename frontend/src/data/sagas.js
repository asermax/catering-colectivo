import { fork } from 'redux-saga/effects'
import recipes from './recipe/sagas'
import events from './event/sagas'

const sagas = [
  recipes,
  events,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
