import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { styles }           from './styles.scss'

class SuccessPanel extends Component {
  render() {
    return (
      <div className={styles}>
        <div className="notification">
          <h2>Your transaction has been submitted to the blockchain!</h2>
          <span>(You must wait for your transaction to be mined)</span>
          <span className="action"><Link to="/pending">See your pending transaction</Link></span>
        </div>
      </div>
    )
  }
}

export default withRouter(SuccessPanel)
