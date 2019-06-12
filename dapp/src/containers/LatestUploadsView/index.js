import React, { Component } from 'react'
import CloudUploadIcon      from '@material-ui/icons/CloudUpload'
import EmptyState           from 'components/EmptyState'
import { styles }           from './styles.scss'

class LatestUploadsView extends Component {
  render() {
    return (
      <div className={styles}>
        <EmptyState
          message="Latest Uploads"
          icon={<CloudUploadIcon />}
        />
      </div>
    )
  }
}

export default LatestUploadsView
