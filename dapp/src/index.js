//first file executed by the browser...react initialisation code comes here
//gives access to redux store
import React               from 'react'
import ReactDOM            from 'react-dom'
import { Provider }        from 'react-redux'
import configureStore      from 'core/store/configureStore'
import App                 from 'containers/App'

const store = configureStore()

//access passed to provider
//allows listening to Redux store to anything that exists in the App component
ReactDOM.render(
  //wraps teh main application shell
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
