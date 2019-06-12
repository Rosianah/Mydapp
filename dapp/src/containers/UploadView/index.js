import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux' //reducer 
import { bindActionCreators }   from 'redux' //importing action creater from /core
import { withRouter }           from 'react-router-dom'
import * as assetActionCreators from 'core/actions/actions-asset'
import * as uiActionCreators    from 'core/actions/actions-ui'//importing ui related action creaters eg opening, closing modal
import { StandardModal }        from 'components/Modals'
import AppBar                   from 'components/AppBar'
import { UploadBox }            from 'components/UploadBox'
import Slide                    from '@material-ui/core/Slide'
import Toolbar                  from '@material-ui/core/Toolbar'
import IconButton               from '@material-ui/core/IconButton'
import ArrowBackIcon            from '@material-ui/icons/ArrowBack'
import CloseIcon                from '@material-ui/icons/Close'
import Typography               from 'components/Typography'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { modalStyles }          from './styles.scss'

//How to transalte. The modal will slide in
function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

//create the upload class
class UploadView extends Component {
  componentDidMount() {
    const { actions } = this.props

    //THis is the fisrt function to be called
    //defined in MapDispatchProps()
    actions.ui.openModal({
      modalKey: 'upload-modal' //key is passed to tell which specific modal should be opend
    })
  }

  close= () => {
    const { history } = this.props
    history.push('/assets')
  }
//called when the asset is added. To register asset
  registerAsset=(asset) => {
    const {
      actions,
      history,
      provider //provider key, metamask is being listened to 
    } = this.props


    //if provider, metamask, exists, go ahead and add thh asset
    if (provider.web3Provider !== null) {
      //panel 1 of 3
      actions.asset.addAsset(asset) 
      //push the route to be rendered     
      history.push('/register?panel=1')
    } else { //install metamask key modal..../metamasknotification
      actions.ui.openModal({ modalKey: 'install-metamask-modal' })
    }
  }

  //this is what is displayed/rendered
  render() {
    const { ui, width } = this.props
    const closeIcon = isWidthUp('md', width) ? <CloseIcon /> : <ArrowBackIcon />

    //gives the modal a unique key then follows the unique content of the modal
    
    return (//this is where you include anything you want the modal to display
      <StandardModal
        modalKey="upload-modal" //passing key of the modal you want to open
        modalState={ui.modalState}
        className="record-modal"
        cssModule={modalStyles}
        onClose={this.close}
        TransitionComponent={TransitionComponent}
      >
        <div>
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="back-arrow"
                onClick={this.close}
                className="arrow-icon"
              >
                {closeIcon}
              </IconButton>
              <Typography variant="title" color="inherit">
                Upload Your Digital Asset
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="upload-view-container">
            <UploadBox
              onDrop={this.onDrop}
              setUploadedFile={this.setUploadedFile}
              registerAsset={this.registerAsset}
            />
          </div>
        </div>
      </StandardModal>
    )
  }
}

//Listens to state changes
function mapStateToProps(state) {
  return {
    provider: state.provider, //listen to provider key in Redux store
    ui: state.ui //resturns a ui state 
    //basically listening to changes in this part of redux store 
    //then pass it to connect()
  }
}

//To dispact React components into actios...so as to change states
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //Call ui related actions
      ui: bindActionCreators(uiActionCreators, dispatch),
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

//DEfining the props and types
UploadView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  asset: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  provider: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

UploadView.defaultProps = {
  asset: null
}

//export the upload view
//mapDispatchToProps() has to be passed to connnect()
export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadView)))
