import { fork } from 'redux-saga/effects'
import recipes from './recipe/sagas'

const sagas = [
  recipes,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
