import constants from 'core/types'

export function setEmail(email) {
  return {
    type: constants.SET_ACCOUNT_EMAIL,
    email
  }
}

export function clear() {
  return {
    type: constants.CLEAR_ACCOUNT
  }
}

//takes default account for ethereum
//sets up a thunk
export function setDefaultAccount(defaultAccount) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    //configuring web3js with the default ethereum account
    web3Provider.eth.defaultAccount = defaultAccount

    //dispatch SET_ACCOUNT which is id
    dispatch((() => {
      return {
        type: constants.SET_ACCOUNT,
        id: defaultAccount
      }
    })())
  }
}
