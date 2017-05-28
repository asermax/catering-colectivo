import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import {
  receiveRecipes, failReceiveRecipes, RECIPE_FETCH_REQUEST,
  receiveRecipe, failReceiveRecipe, RECIPE_CREATE_REQUEST,
} from './actions'

const RECIPE_ENTRYPOINT = 'recipe'

function* fetchRecipes() {
  try {
    const recipes = yield call(api.fetch, RECIPE_ENTRYPOINT)
    yield put(receiveRecipes(recipes))
  } catch(e) {
    yield put(failReceiveRecipes())
  }
}

function* createRecipe(action) {
  try {
    const recipe = yield call(api.create, RECIPE_ENTRYPOINT, action.recipe)
    yield put(receiveRecipe(recipe))
  } catch(e) {
    yield put(failReceiveRecipe())
  }
}

function* recipeSaga() {
  yield [
    takeLatest(RECIPE_FETCH_REQUEST, fetchRecipes),
    takeLatest(RECIPE_CREATE_REQUEST, createRecipe),
  ]
}

export default recipeSaga
