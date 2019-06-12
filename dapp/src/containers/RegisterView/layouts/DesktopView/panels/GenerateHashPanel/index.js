import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter, Link }     from 'react-router-dom'
import ProgressIndicator        from 'components/ProgressIndicator'
import * as assetActionCreators from 'core/actions/actions-asset'
import { getString }            from 'core/libs/lib-asset-helpers'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

class GenerateHashPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: true
    }
  }

  //chech redux store and read asset key
  //if nohash call get string helper fuction ./core/libs
  componentDidMount() {
    const { actions, asset } = this.props

    if (asset.assetHash === '') {
      getString(asset.stagedAsset, (assetUrl) => {
        setTimeout(() => {
          actions.asset.checkIfRegistered(assetUrl)
        }, 2000) //2 second thunk
      })
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { asset } = nextProps
//if theres hash, move to the next step
    if (asset.assetHash !== '') {
      return { nextBtnDisabled: false }
    } else if (asset.alreadyExists) { //user does not proceed if asset exists
      return { nextBtnDisabled: true }
    }

    return { nextBtnDisabled: true }
  }

  //push user to the next stage 
  getControls = () => {
    const { nextBtnDisabled } = this.state
    return (
      <Controls
        prevDisabled={false}
        nextDisabled={nextBtnDisabled}
        handleNext={this.proceed}
      />
    )
  }

  proceed = () => {
    const { history } = this.props
    history.push('/register?panel=3')
  }

  render() {
    const { asset } = this.props
    const { alreadyExists, assetHash, error } = asset
    let content

    //if already exists, cant proceed
    if (alreadyExists) {
      content = (
        <div className="notification">
          <h2>Sorry, someone already registered this asset!</h2>
          <span className="action"><Link to="/upload">Upload a new asset</Link></span>
        </div>
      )
      //generate asset for the user
    } else if (assetHash) {
      content = (
        <div>
          <h2>Unique hash (SHA-256) of your asset</h2>
          <span>Click Next to register your asset</span>
          <div id="unique-hash">{assetHash}</div>
        </div>
      )
      //if metamask is missing, ask the user to install it
    } else if (error) {
      content = (
        <div className="notification">
          <h2>Sorry, there&apos;s an error!</h2>
          <span className="action"><Link to="/upload"> Are you logged into MetaMask <br /> and is MetaMask pointed to the Main Net?</Link></span>
        </div>
      )
    } else if (asset.stagedAsset) {
      content = (
        <div>
          <h2>Generating a unique hash of your asset...</h2>
          <div id="hash-progress-indicator">
            <ProgressIndicator type="linear" />
            <span className="blink">Please hold on...</span>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="notification">
          <h2>Please upload an asset to register</h2>
          <span className="action"><Link to="/home">Upload an asset</Link></span>
        </div>
      )
    }

    return (
      <div className={styles}>
        {content}
        {this.getControls()}
      </div>
    )
  }
}

GenerateHashPanel.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  asset: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

function mapStateToProps(state) {
  return {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenerateHashPanel))
