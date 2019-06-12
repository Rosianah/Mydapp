import React, { Component } from 'react'
import ImageIcon            from '@material-ui/icons/Image'
import EmptyState           from 'components/EmptyState'
import { styles }           from './styles.scss'
import { connect }              from 'react-redux'

class AssetsView extends Component {
  state ={
    listings:[]
  }

  componentDidMount(){
    console.log(this.props.asset.assetHash,this.props.account.email,this.props.account.id)
  }

  storeinList = ()=>{
    const { email, id } = this.props.account
    const { assetHash } = this.props.asset
    this.setState({
      listings:[...this.state,{ id, email,assetHash }]
    })
    console.log(this.state.listings)
  }

  

  render() {
    return (
      <div className={styles}>
        <EmptyState
          message="You have no assets yet."
          icon={<ImageIcon />}
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

export default connect(mapStateToProps, null)(AssetsView)
