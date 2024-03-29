import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { isEmail }          from 'validator'
import { inputStyles }      from './styles.scss'

class Input extends Component {
  static determineValidity(type, value) {
    switch (type) {
      case 'email':
        return {
          type,
          valid: isEmail(value),
          value
        }
      case 'text':
        return {
          type,
          valid: value.length > 0,
          value
        }
      default:
        return false
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { value, type } = nextProps
    if (type === 'text') {
      return { value }
    }
    return {}
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidUpdate() {
    const { autoFocus } = this.props
    if (autoFocus) { this.input.focus() }
  }

  //if valid the next button is enabled
  onChange=(evt) => {
    const  { value } = evt.currentTarget
    const { type, checkIfValid } = this.props

    this.setState({ value })

    if (checkIfValid) {
      checkIfValid(Input.determineValidity(type, value))
    }
  }

  onKeyPress = (evt) => {
    const { onKeyPress } = this.props
    if (onKeyPress) { onKeyPress(evt) }
  }

  render() {
    const {
      type,
      placeholder,
      disabled,
      required
    } = this.props
    const { value } = this.state


    return (
      <div className={inputStyles}>
        <input
          type={type}
          value={value}
          required={required}
          ref={(input) => { this.input = input }}
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          disabled={disabled}
        />
      </div>
    )
  }
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  checkIfValid: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired
}

Input.defaultProps = {
  autoFocus: false,
  disabled: false,
  onKeyPress: null,
  placeholder: '',
  checkIfValid: null,
  required: false
}

export default Input
