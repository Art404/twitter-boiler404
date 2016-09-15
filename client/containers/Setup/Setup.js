import React, {PropTypes} from 'react'
import Tweet from 'react-tweet'
import LogoutBtn from '../../components/LogoutBtn/LogoutBtn'
import Profile from '../../components/Profile/Profile'
import Loading from 'react-loading'
import {cloneDeep} from 'lodash'

class Setup extends React.Component {
  static displayName = 'Setup'

  static propTypes = {
    'app': PropTypes.object
  }

  render() {
    const {app} = this.props
    const notRequested = app && app.user === undefined
    if (notRequested) {
      return (
        <div className="container">
          <div className="full-width center">
            <div className="Loader">
              <Loading
                delay={-1}
                type="spinningBubbles"
                color="#0aaaf5" />
            </div>
          </div>
        </div>
      )
    }

    if (app.user === null) {
      return (
        <a href="/">{'please login'}</a>
      )
    }

    const userClone = cloneDeep(app.user)
    const tweetData = userClone.status.retweeted_status ? null : {
      ...userClone.status,
      user: userClone
    }

    return (
      <div id="Setup" className="full-width">
        <div className="container">
          <div id="Setup-profile">
            <h2>Logged in as @{app.user.screen_name}</h2>
            <Profile user={app.user} />
          </div>
          <div id="Setup-tweet">
            <h2>Last tweet:</h2>
            {tweetData ? <Tweet data={tweetData} /> : 'No last original last tweet found!'}
          </div>
        </div>
        <div id="Setup-logout" className="container clear">
          <LogoutBtn />
        </div>
      </div>
    )
  }
}

export default Setup

