import React, {PropTypes} from 'react'
import Loading from 'react-loading'
import {Link} from 'react-router'
import LoginBtn from '../../components/LoginBtn/LoginBtn'

class Home extends React.Component {
  static displayName = "Home"

  static propTypes = {
    'app': PropTypes.object
  }

  render() {
    const {app} = this.props
    const notRequested = app && app.user === undefined

    // default handler
    let HomeCpt = (
      <div className="Loader">
        <Loading
          delay={-1}
          type="spinningBubbles"
          color="#0aaaf5" />
      </div>
    )

    if (!notRequested) {
      HomeCpt = <LoginBtn {...this.props}/>
    }

    if (app.user) {
      HomeCpt = (
        <Link
          className="Continue"
          to="/setup">
          {'Continue '}&rarr;
        </Link>
      )
    }

    // error handler
    if (app.errorCode) {
      return (
        <code style={{width: '100%', textAlign: 'center', marginTop: '200px'}}>
          GOT ERROR CODE {app.errorCode}
        </code>
      )
    }

    return (
      <div id="Home">
        <div className="container">
          <div className="full-width center">
            {HomeCpt}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
