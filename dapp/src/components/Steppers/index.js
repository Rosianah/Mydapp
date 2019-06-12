import React, { Component }      from 'react'
import PropTypes                 from 'prop-types'
import {
  Stepper as MuiStepper,
  Step,
  StepLabel
} from '@material-ui/core'
import { styles }                from './styles.scss'//import css modules

//check the active current step, display wherethe user is at currently
//ES6 class component
class Stepper extends Component {
  render() {
    const { activeStep, steps } = this.props

    return (
      <div className={styles}>
        <MuiStepper activeStep={activeStep}>          
          {steps.map((label) => {  //check and return the steps
            return (
              <Step key={label} >
                <StepLabel
                //overwriting the material claanames to define own styles
                  classes={{ root: 'root', disabled: 'disabled' }}
                >
                  {label}
                </StepLabel>
              </Step>
            )
          })}
        </MuiStepper>
      </div>
    )
  }
}

Stepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
}

Stepper.defaultProps = {
  activeStep: 0
}

export default Stepper
