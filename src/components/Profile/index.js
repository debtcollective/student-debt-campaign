// @flow

import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { logout } from '../../api/auth'

type Props = {
  user: User
}

const Profile = ({ user, ...rest }: Props) => {
  const communityProfileURL = `${process.env.GATSBY_COMMUNITY_URL}/u/${user.username}/`

  return user.id ? (
    <Dropdown>
      <Dropdown.Toggle variant="transparent" size="sm" id="dropdown-basic">
        <div id="user-profile" className="user-profile" data-testid="profile">
          <img
            className="rounded-circle"
            src={user.avatar_url}
            alt={user.username}
          />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          href={communityProfileURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hi, {user.username}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => logout(user)}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : null
}

export default Profile
