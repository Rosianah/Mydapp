import { combineReducers } from 'redux'
import { accountReducer }  from 'core/reducers/reducer-account'
import { assetReducer }    from 'core/reducers/reducer-asset'
import { providerReducer } from 'core/reducers/reducer-provider'
import { uiReducer }       from 'core/reducers/reducer-ui'
import { contractReducer } from 'core/reducers/reducer-contract'

//add all the reducers
const rootReducer = combineReducers({
  account: accountReducer, //getting the default account
  asset: assetReducer,
  contract: contractReducer,
  provider: providerReducer, //metamask
  ui: uiReducer
})

export default rootReducer
