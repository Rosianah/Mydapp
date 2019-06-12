import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import Paper                from '@material-ui/core/Paper'
import { Tabs, Tab }        from '@material-ui/core'
import ImageIcon            from '@material-ui/icons/Image'
import TimeIcon             from '@material-ui/icons/AccessTime'
import CloudUploadIcon      from '@material-ui/icons/CloudUpload'
import { styles }           from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { location } = nextProps
    let currentTab

    switch (location.pathname) {
      case '/assets':
        currentTab = 0
        break
      case '/latest':
        currentTab = 1
        break
      case '/pending':
        currentTab = 2
        break
      default:
        currentTab = 0
        break
    }

    return { currentTab }
  }

  handleChange=(evt, tab) => {
    this.setState({ currentTab: tab })
    this.updateURL(tab)
  }

  updateURL(tab) {
    const { history } = this.props

    switch (tab) {
      case 0:
        history.push('/assets')
        break
      case 1:
        history.push('/latest')
        break
      case 2:
        history.push('/pending')
        break
      default:
        break
    }
  }

  render() {
    const { currentTab } = this.state

    return (
      <div className={styles}>
        <Paper>
          <Tabs
            className="main-navigation"
            value={currentTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab
              icon={<ImageIcon />}
              label="Your Assets"
              className="tab"
            />
            <Tab
              icon={<CloudUploadIcon />}
              label="Latest Uploads"
              className="tab"
            />
            <Tab
              icon={<TimeIcon />}
              label="Pending Tx"
              className="tab"
            />
          </Tabs>
        </Paper>
      </div>
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default withRouter(Navigation)
