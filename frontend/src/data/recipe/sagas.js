import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import { receiveRecipes, failReceiveRecipes, RECIPE_FETCH_REQUEST } from './actions'

const RECIPE_ENTRYPOINT = 'recipe'

function* fetchRecipes() {
  try {
    const recipes = yield call(api.fetch, RECIPE_ENTRYPOINT)
    yield put(receiveRecipes(recipes))
  } catch(e) {
    yield put(failReceiveRecipes())
  }
}

function* recipeSaga() {
  yield [
    takeLatest(RECIPE_FETCH_REQUEST, fetchRecipes),
  ]
}

export default recipeSaga
