import React from 'react'
import { navigate } from '@reach/router'

const SingleUserProfile = (props) => {
  const { username } = props
  return (
    <div>
      <p>Welcome: {username} </p>
      {props.users && props.users.map(user => {
        if (user.username === props.username) {
          return (
            <div>
              <img src={user.avatar_url} alt='' />
              <h3> Name: {user.name}</h3>
              <h3>Username: {user.username}</h3>
              <button onClick={() => { handleArticleClick(props.username) }}>See Your Articles</button>
              <button onClick={() => handleLogOutClick(props)}>Log Out</button>
            </div>
          )
        }
      })}
    </div>
  )
}

const handleLogOutClick = (props) => {
  const { removeUser } = props
  console.log(props)
  removeUser()
  navigate('/')
}

const handleArticleClick = (username) => {
  navigate(`/${username}/articles`)
}

export default SingleUserProfile
