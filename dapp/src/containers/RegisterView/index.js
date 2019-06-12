import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import * as accountActionCreators   from 'core/actions/actions-account'
import * as assetActionCreators     from 'core/actions/actions-asset'
import withWidth, { isWidthUp }     from '@material-ui/core/withWidth'
import DesktopView                  from './layouts/DesktopView'
import MobileView                   from './layouts/MobileView'
import { styles }                   from './styles.scss'
import { requestAccountAccess } from '../../core/libs/lib-metamask-helper';

class RegisterView extends Component {
  componentWillUnmount() {
    const { actions } = this.props //available as long as as connect() is used
    
    requestAccountAccess((defaultAccount) => {
      actions.account.setDefaultAccount(defaultAccount)
      actions.asset.clear()
    })    
  }

  //queries the url to get the panel number  and passes it tp panel in desktopview
  getPanel = () => {
    const { location } = this.props
    return parseInt(location.search.substr(1).split('=')[1], 10)
  }

  renderView=() => {
    const { asset, width } = this.props
    const panel = this.getPanel()

    if (isWidthUp('md', width)) {
      return (<DesktopView asset={asset} panel={panel} />)
    }
    return (<MobileView asset={asset} panel={panel} />)
  }

  render() {
    return (
      <div className={styles}>
        {this.renderView()}
      </div>
    )
  }
}

//Listens to state changes
function mapStateToProps(state) {
  return {
    asset: state.asset//basically listening to changes in this part of redux store 
    //then pass it to connect()
  }
}

//To dispact React components into actios...so as to change states
function mapDispatchToProps(dispatch) {
  return {
    //call for the actions
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch),
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

//define the proptypes
RegisterView.propTypes = {
  asset: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(RegisterView))
