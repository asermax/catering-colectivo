import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import {
  receiveRecipes, failReceiveRecipes, RECIPE_FETCH_REQUEST,
  receiveRecipe, failReceiveRecipe, RECIPE_CREATE_REQUEST,
  updateRecipe, failUpdateRecipe, RECIPE_EDIT_REQUEST,
  removeRecipe, failRemoveRecipe, RECIPE_DELETE_REQUEST,
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

function* editRecipe(action) {
  try {
    const recipe = yield call(api.update, RECIPE_ENTRYPOINT, action.id, action.recipe)
    yield put(updateRecipe(action.id, recipe))
  } catch(e) {
    yield put(failUpdateRecipe())
  }
}

function* deleteRecipe(action) {
  try {
    const ok = yield call(api.delete, RECIPE_ENTRYPOINT, action.id)

    if (ok) {
      yield put(removeRecipe(action.id))
    } else {
      yield put(failRemoveRecipe())
    }
  } catch(e) {
    yield put(failRemoveRecipe())
  }
}

function* recipeSaga() {
  yield [
    takeLatest(RECIPE_FETCH_REQUEST, fetchRecipes),
    takeLatest(RECIPE_CREATE_REQUEST, createRecipe),
    takeLatest(RECIPE_EDIT_REQUEST, editRecipe),
    takeLatest(RECIPE_DELETE_REQUEST, deleteRecipe),
  ]
}

export default recipeSaga
