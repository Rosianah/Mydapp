import React, { Component } from 'react'
import TimeIcon             from '@material-ui/icons/AccessTime'
import EmptyState           from 'components/EmptyState'
import { styles }           from './styles.scss'

class PendingTransactionsView extends Component {
  render() {
    return (
      <div className={styles}>
        <EmptyState
          message="Pending Transactions."
          icon={<TimeIcon />}
        />
      </div>
    )
  }
}

export default PendingTransactionsView
