import { call, put, takeLatest } from 'redux-saga/effects'
import api from 'data/api'
import {
  receiveRecipes, failReceiveRecipes, RECIPE_FETCH_REQUEST,
  receiveRecipe, failReceiveRecipe, RECIPE_CREATE_REQUEST,
  updateRecipe, failUpdateRecipe, RECIPE_EDIT_REQUEST,
  removeRecipe, failRemoveRecipe, RECIPE_DELETE_REQUEST,
} from './actions'
import { allRecipesQuery } from './queries'
import { createRecipeMutation, updateRecipeMutation, deleteRecipeMutation } from './mutations'

function* fetchRecipes() {
  try {
    const queryResult = yield call(api.query, allRecipesQuery)
    yield put(receiveRecipes(queryResult.recipes))
  } catch(error) {
    yield put(failReceiveRecipes(error.message))
  }
}

function* createRecipe(action) {
  try {
    const response = yield call(api.mutate, createRecipeMutation, { recipe: action.recipe })
    yield put(receiveRecipe(response.recipe))
  } catch(error) {
    yield put(failReceiveRecipe(error.message))
  }
}

function* editRecipe(action) {
  try {
    const response = yield call(api.mutate, updateRecipeMutation, {
      id: action.id,
      recipe: action.recipe ,
    })
    yield put(updateRecipe(action.id, response.recipe))
  } catch(error) {
    yield put(failUpdateRecipe(error.message))
  }
}

function* deleteRecipe(action) {
  try {
    const response = yield call(api.mutate, deleteRecipeMutation, { id: action.id })

    if (response.deleted) {
      yield put(removeRecipe(action.id))
    } else {
      yield put(failRemoveRecipe('The recipe couldn\'t be deleted'))
    }
  } catch(error) {
    yield put(failRemoveRecipe(error.message))
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
