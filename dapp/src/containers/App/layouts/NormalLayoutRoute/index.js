import React             from 'react'
import PropTypes         from 'prop-types'
import { Route }         from 'react-router-dom'
import Header            from './components/Header'
import Footer            from './components/Footer'
import { styles }        from './styles.scss'

//high order component. Takes input (componnet) and enhances then reexport
const NormalLayoutRoute = ({ component: Component }) => {
  return (
    <Route
      render={matchProps => (
        <div className={styles}>
          <Header />
          <Footer />
          <div className="main-content normal-layout">
            <Component {...matchProps} />
          </div>
        </div>
    )}
    />
  )
}

NormalLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default NormalLayoutRoute
