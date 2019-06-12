import constants from 'core/types'

//set initial state
const initialState = {
  proofOfExContract: null
}

//listen to SET_CONTRACT
export function contractReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_CONTRACT:
      return Object.assign({}, state, {
        proofOfExContract: action.proofOfExContract
      })

    default:
      return state
  }
}
