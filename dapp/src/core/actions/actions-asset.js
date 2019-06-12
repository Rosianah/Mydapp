//actions involving the asset
import constants from 'core/types'
import sha256    from 'sha256'

//dispact an action of type addAsset, added to types file
export function addAsset(asset) {
  return {
    type: constants.ADD_ASSET,
    asset
  }
}

export function clear() {
  return {
    type: constants.CLEAR_ASSETS
  }
}

async function checkIfAssetRegistered(ProofOfExContract, assetHash) {
  const assetExists = ProofOfExContract.deployed().then((poe) => {
    return poe.checkIfRegistered(assetHash)
  })
  return assetExists
}

async function registerAsset(ProofOfExContract, assetHash) {
  const result = ProofOfExContract.deployed().then((poe) => { //call smart contract
    return poe.registerAsset(assetHash) //return promise and call smart contract function
  })
  const transaction = (result !== null) ? result : null
  return transaction
}

function dispatchAssetAlreadyExists(dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ASSET,
      alreadyExists: true
    }
  })())
}

function dispatchAssetDoesNotExist(assetHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ASSET,
      alreadyExists: false,
      assetHash
    }
  })())
}

//dispatch CREATE_ASSET_HASH action and reducer changes the state
function dispatchAssetCreated(transaction, assetHash, dispatch) {
  dispatch((() => {
    //take the assetHash and transaction
    return {
      type: constants.CREATE_ASSET_HASH,
      assetHash,
      transaction,
      success: true
    }
  })())
}

//if transaction not successful
function dispatchCreationError(dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_ASSET_HASH,
      success: false
    }
  })())
}

//async thunk to check if checkif registered promised is met
export function checkIfRegistered(assetUrl) {
  return async (dispatch, getState) => { //create thunk
    const { proofOfExContract } = getState().contract //get instance of proofofexistence
    const assetHash = sha256(assetUrl) //create a hash 
    const assetExists = await checkIfAssetRegistered(proofOfExContract, assetHash)

    if (assetExists) {
      dispatchAssetAlreadyExists(dispatch)
    } else {
      dispatchAssetDoesNotExist(assetHash, dispatch)
    }
  }
}

//register - action creator
export function register() {
  return async (dispatch, getState) => {
    const { proofOfExContract } = getState().contract //get instance of the smart contract from redux store
    const { assetHash } = getState().asset //get asset hash added in previous panel
    //transaction variable gets the result of the registerAsset() function (where the contract is called)
    const transaction = await registerAsset(proofOfExContract, assetHash) //create a transaction
    

    if (transaction) {
      dispatchAssetCreated(transaction, assetHash, dispatch)
    } else {
      dispatchCreationError(dispatch)
    }
  }
}
