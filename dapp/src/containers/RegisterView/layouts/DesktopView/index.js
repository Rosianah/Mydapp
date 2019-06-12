import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import Stepper              from 'components/Steppers' //from material ui. shows progress
import Photo                from './components/Photo'
import CredentialsPanel     from './panels/CredentialsPanel'
import GenerateHashPanel    from './panels/GenerateHashPanel'
import RegisterAssetPanel   from './panels/RegisterAssetPanel'
import SuccessPanel         from './panels/SuccessPanel'
import { styles }           from './styles.scss'

class DesktopView extends Component {
  //render content function....quries the panels from get panrl above
  renderContent() {
    const { panel } = this.props

    switch (panel) {
      case 1:
        return <CredentialsPanel />
      case 2:
        return <GenerateHashPanel />
      case 3:
        return <RegisterAssetPanel />
      case 4:
        return <SuccessPanel />
      default:
        break
    }

    return null
  }

    //import/get added asset so define mapStateToProps and pass it as tfirst he arguement iin connect()
    //
  render() {
    const { asset, panel } = this.props

    //register-form-container contains the stepper
    return (
      <div className={styles}>
        <div id="register-view"> 
          <Photo asset={asset} />
          <div id="registration-form-container">
            <Stepper
              activeStep={panel - 1} //steps displayed per the panel number...displays the queried panel
              steps={[
                'Enter Credentials',
                'Generate Unique Hash',
                'Register'
              ]}
            />        
            <div id="registration-form">{this.renderContent()}</div> 
          </div>
        </div>
      </div>
      //getPanel() quries the panels from get panrl above
      //renderContent detects the panel and renders its info
    )
  }
}

DesktopView.propTypes = {
  asset: PropTypes.shape({}).isRequired,
  panel: PropTypes.number.isRequired
}

export default DesktopView
