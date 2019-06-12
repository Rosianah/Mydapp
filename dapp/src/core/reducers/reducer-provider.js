//has to be defined when calling an action because teh reducer has to listen to the same type of action that action creator dispatches
import constants from 'core/types'

const initialState = {
  web3Provider: null
}

//export reducer
export function providerReducer(state = initialState, action) {
  switch (action.type) { //LISTENS TO TYPE of action that has been dispatched
    //if its SET_PROVIDER it creates a new edux store
    case constants.SET_PROVIDER:
      return Object.assign({}, state, {
        web3Provider: action.web3Provider //web3provider key is set with what was passed to it, ie metamask
      })

    default:
      return state
  }
}
