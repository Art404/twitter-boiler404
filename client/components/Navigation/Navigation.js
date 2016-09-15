import React from 'react'
import Logo from '../Logo/Logo'
import {Link} from 'react-router'

class Navigation extends React.Component {
  static displayName = 'Navigation'

  render() {
    return (
      <nav className="Navigation">
        <div className="Navigation-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <a className="Navigation-github" href="http://github.com/art404/twitter-boiler404" target="_blank">
          <div className="Navigation-github-icn" />
        </a>
      </nav>
    )
  }
}

export default Navigation
