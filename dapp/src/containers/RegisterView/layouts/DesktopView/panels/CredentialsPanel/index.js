import React, { Component }        from 'react'
import PropTypes                   from 'prop-types'
import { connect }                 from 'react-redux'
import { bindActionCreators }      from 'redux'
import { withRouter }              from 'react-router-dom'
import { Form, Label, Input }      from 'components/Form'
import * as accountActionCreators  from 'core/actions/actions-account'
import * as contractActionCreators from 'core/actions/actions-contract'
import { requestAccountAccess }    from 'core/libs/lib-metamask-helper'
import Controls                    from '../../components/Controls'
import { styles }                  from './styles.scss'

class CredentialsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allowToProceed: false,
      email: '',
      nextBtnDisabled: true, //next is disabled by default
      id: '' //state key id set
    }
  }

  componentDidMount() {
    const { actions } = this.props

    //metamask helper...//core/libs
    //asks metamask to get user permission to allow metamask to reveal account id
    requestAccountAccess((defaultAccount) => {
      actions.account.setDefaultAccount(defaultAccount) //get account id from user
      actions.contract.setContract(defaultAccount) //set contract defaults...actions/contract
    })
  }
//automatically listens for thing from when redux store is set  and maps next/new props to state called id
  static getDerivedStateFromProps(nextProps) {
    const { account } = nextProps

    return { id: account.id }
  }

  onEnter = (evt) => {
    if (evt.key === 'Enter') {
      const { allowToProceed } = this.state
      if (allowToProceed) { this.proceed() }
    }
  }

    //proceed() calls setEmail() and pushes user to the next panel by calling React router and
    //register with query panel = 2
  proceed = () => {
    const { actions, history } = this.props
    const { email } = this.state

    actions.account.setEmail(email)
    history.push('/register?panel=2')
  }

  //enabled if enetred values are valid
  enableNext=(input) => {
    const { asset } = this.props

    if (input.valid && asset.stagedAsset) {
      this.setState({
        allowToProceed: true,
        email: input.value,
        nextBtnDisabled: false
      })
    }
  }
//check if email is valid and enable the next button
//onKeyPress = enter calls proceed()
  render() {
    const { id, nextBtnDisabled } = this.state

    return (
      <div className={styles}>
        <h2>Enter Your Credentials</h2>
        <span>Your name and account ID will be registered on the Blockchain</span>
        <Form>
          <div className="form-section">
            <Label text="Asset Name" />
            <Input
              type="text"
              autoFocus
              onKeyPress={this.onEnter}
              checkIfValid={this.enableNext}
            />
          </div>
          <div className="form-section">
            <Label text="Your Account ID (from MetaMask)" />
            <Input
              type="text"
              readOnly
              value={id}
            />
          </div>
        </Form>
        <Controls
          prevDisabled
          nextDisabled={nextBtnDisabled}
          handleNext={this.proceed}
        />
      </div>
    )
  }
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
      account: bindActionCreators(accountActionCreators, dispatch),
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}

CredentialsPanel.propTypes = {
  account: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({}).isRequired,
  asset: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired
}

CredentialsPanel.defaultProps = {
  asset: null
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CredentialsPanel))
