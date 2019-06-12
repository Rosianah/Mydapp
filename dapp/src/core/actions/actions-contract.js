import constants        from 'core/types'
import contract         from 'truffle-contract'
import ProofOfExistence from 'contracts/ProofOfExistence.json'

function dispatchSetContract(dispatch, proofOfExContract) {
  dispatch((() => {
    return {
      type: constants.SET_CONTRACT,
      proofOfExContract
    }
  })())
}

//gets web3provider, metamask, use truffle to get abi definition of the contract
//ABI definition is the JSON version of the contract
export function setContract(defaultAccount) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const ProofOfExContract = contract(ProofOfExistence) //query instinct of proofofexistence contract

    ProofOfExContract.setProvider(web3Provider.currentProvider)
    ProofOfExContract.defaults({ from: defaultAccount }) //specify who the transactions are coming from

    dispatchSetContract(dispatch, ProofOfExContract)
  }
}
