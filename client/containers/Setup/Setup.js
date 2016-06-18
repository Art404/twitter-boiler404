import React, {PropTypes} from 'react'
import Tweet from 'react-tweet'
import LogoutBtn from '../../components/LogoutBtn/LogoutBtn'
import Profile from '../../components/Profile/Profile'
import {cloneDeep} from 'lodash'

class Setup extends React.Component {
  static displayName = 'Setup'

  static propTypes = {
    'app': PropTypes.object
  }

  render() {
    const {user} = this.props.app
    if (!user) return <a href="/">{'please login'}</a>

    const userClone = cloneDeep(user)
    const tweetData = userClone.status.retweeted_status ? null : {
      ...userClone.status,
      user: userClone
    }

    return (
      <div id="Setup" className="full-width">
        <div className="container">
          <div id="Setup-profile">
            <h2>Logged in as @{user.screen_name}</h2>
            <Profile user={user} />
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

