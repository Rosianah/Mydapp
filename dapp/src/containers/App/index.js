import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import { MuiThemeProvider }         from '@material-ui/core/styles'
import {
  HashRouter,
  Redirect,
  Switch
} from 'react-router-dom'
import theme                        from 'configs/theme/config-theme'
import UploadView                   from 'containers/UploadView'
import AssetsView                   from 'containers/AssetsView'
import PendingTransactionsView      from 'containers/PendingTransactionsView'
import LatestUploadsView            from 'containers/LatestUploadsView'
import RegisterView                 from 'containers/RegisterView'
import * as providerActionCreators  from 'core/actions/actions-provider'
import NormalLayoutRoute            from './layouts/NormalLayoutRoute'
import RegistrationLayoutRoute      from './layouts/RegistrationLayoutRoute'
import MetaMaskNotification         from './components/MetaMaskNotification'

import './styles.scss' // global styles

//mounting different components/modals
class App extends Component {
  componentDidMount() {
    const { actions } = this.props
    //funtion available in the provider key
    actions.provider.setProvider() //called when the dapp loads...metamask detecting
  }

  render() {
    return (
      //Normal layout includes header and footer
      //registration route chucks header and footer
      //defining route
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <Switch>    
            <NormalLayoutRoute path="/assets" component={AssetsView} />
            <NormalLayoutRoute path="/pending" component={PendingTransactionsView} />
            <NormalLayoutRoute path="/latest" component={LatestUploadsView} />
            <NormalLayoutRoute path="/upload" component={UploadView} />
            <RegistrationLayoutRoute path="/register" component={RegisterView} />
            <Redirect from="/" to="/assets" />
          </Switch>
        </HashRouter>
        <MetaMaskNotification />
      </MuiThemeProvider>
    )
  }
}

//dispact actions to providers
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}

App.propTypes = {
  actions: PropTypes.shape({}).isRequired
}

//null is passed as the first connect arguement here because 
//at this point no change is being listened to
export default connect(null, mapDispatchToProps)(App)
