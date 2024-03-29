import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter }           from 'react-router-dom'
import * as assetActionCreators from 'core/actions/actions-asset'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

class RegisterAssetPanel extends Component {
  constructor(props) {
    super(props)
    const { email, id } = props.account
    const { assetHash } = props.asset

    //nextBtnDisabled statekey is passed into controls
    this.state = {
      nextBtnDisabled: !((email && id && assetHash))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset.transaction) {
      const { history } = this.props
      history.push('/register?panel=4')
    }
  }

  //gets called when the next button is clicked
  registerAsset = () => {
    const { actions } = this.props
    //call register action creator 
    actions.asset.register()
  }


  render() {
    const { id, email } = this.props.account
    const { assetHash } = this.props.asset
    const { nextBtnDisabled } = this.state

    return (
      <div className={styles}>
        <h2>Confirm Transaction</h2>
        <span>Summary of your information</span>
        <div id="registration-details">
          <ul>
            <li>
              <span>Asset Name:</span>
              <span>{email}</span>
            </li>
            <li>
              <span>MetaMask ID:</span>
              <span>{id}</span>
            </li>
            <li>
              <span>Unique Hash <br />of Asset:</span>
              <span>{assetHash}</span>
            </li>
          </ul>
        </div>
        <Controls
          prevDisabled={false}
          nextDisabled={nextBtnDisabled}
          nextLabel="Register"
          handleNext={this.registerAsset}
        />
      </div>
    )
  }
}

RegisterAssetPanel.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({}).isRequired,
  asset: PropTypes.shape({
    assetHash: PropTypes.string,
    transaction: PropTypes.shape({})
  }),
  history: PropTypes.shape({}).isRequired
}

RegisterAssetPanel.defaultProps = {
  asset: null
}

function mapStateToProps(state) {
  return {
    account: state.account,
    asset: state.asset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterAssetPanel))
