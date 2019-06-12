//middleware is a third party used to enhance REdux

import { applyMiddleware, createStore }  from 'redux'
import thunk                             from 'redux-thunk'
import { createLogger }                  from 'redux-logger'
import rootReducer                       from 'core/reducers'

export default function configureStore(initialState) {
  const logger = createLogger({ //install logger...dispactes actions dispatched in teh console to help in debugging
    collapsed: true,
    predicate: () =>
      process.env.NODE_ENV === 'development'
  })

  const enhancedInitialState = Object.assign({}, initialState)
  const middleware = applyMiddleware(thunk, logger)
  const store = middleware(createStore)(rootReducer, enhancedInitialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  //return the final veersion of teh redux store, teh configured one
  return store
}
