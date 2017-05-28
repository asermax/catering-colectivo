/* globals module, window */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import appReducers from './reducers'
import appSagas from './sagas'

function generateReducer() {
  return combineReducers({
    ...appReducers,
    router: routerReducer,
  })
}

function runSagas(middleware) {
  return middleware.run(appSagas)
}

export function configureStore(history, initialState = {}) {
  // initialize middlewares
  const routerMiddlewareInit = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()

  // create store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    generateReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddlewareInit,
      ),
    )
  )

  // apply sagas
  let currentSagas = runSagas(sagaMiddleware)

  // hot reload
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(generateReducer())
    })

    module.hot.accept('./sagas', async () => {
      currentSagas.cancel()
      await currentSagas.done
      currentSagas = runSagas(sagaMiddleware)
    })
  }

  return store
}
