import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { Paper }            from '@material-ui/core'
import imagePlaceholderSvg  from 'assets/svgs/image-placeholder.svg'
import ProgressIndicator    from 'components/ProgressIndicator'
import { getString }        from 'core/libs/lib-asset-helpers' //get string value off the asset..the file upload
import { styles }           from './styles.scss'

class Photo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainImage: null,
      imageContainer: <ProgressIndicator
        type="circle"
        size={60}
        thickness={6}
      />
    }
  }

  componentDidMount() {
    this.setImage()
    this.showImage()
  }

  setImage=() => {
    const { asset } = this.props

    if (!asset.stagedAsset) {
      this.setState({
        mainImage: <img className="placholder-image" src={imagePlaceholderSvg} alt="Placeholder" />
      })
      //get string to convert the image url that can be passed as an html element
    } else {
      getString(asset.stagedAsset, (imageUrl) => {
        this.setState({
          mainImage: <img className="uploaded-image" src={imageUrl} alt="Uploaded" />
        })
      })
    }
  }
  getgetget
  showImage=() => {
    setTimeout(() => {
      const { mainImage } = this.state
      this.setState({ imageContainer: mainImage })
    }, 500)
  }

  render() {
    const { imageContainer } = this.state

    return (
      <div className={styles}>
        <div className="image-container">
          <Paper>
            <div className="image-preview">
              {imageContainer}
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

Photo.propTypes = {
  asset: PropTypes.shape({}).isRequired
}

export default Photo
