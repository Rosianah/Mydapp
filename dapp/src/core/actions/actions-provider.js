//Detect Metamask

import constants from 'core/types' //has to be defined when calling an action because teh reducer has to listen to the same type of action that action creator dispatches
import Web3      from 'web3' //import web

//dispatch provider....pulls ethereum obj off the window obj and instantiate web3 object
function dispatchProvider(dispatch) {
  const { ethereum } = window
  //pass it to the provider, metamask
  const web3Provider = new Web3(ethereum)
  //dispatch the provider in the redux store
  dispatch((() => {
    return {
      type: constants.SET_PROVIDER, //action SET_PROVIDER dispatch
      web3Provider
    }
  })())
}

//export the setProvider()
export function setProvider() {
  return (dispatch) => { //set up thunk
    //if ethereum is available then dispatch
    if (window.ethereum) {
      dispatchProvider(dispatch)

      //Automatic 5 millisecond loading to dwtwct metamask
    } else { 
      setInterval(() => {
        //If metamask has been detected, clear the interval....continues loading
        if (window.ethereum) {
          clearInterval()
          dispatchProvider()
        }
        //if metamask has not been detected, constatntly reload teh page every 5 miliseconds
        if (window.document.hidden) { window.location.reload() } //only happens when the dapp is not in view...user won't have to reload every 5 seconds
      }, 500)
    }
  }
}
