import React from 'react'
import { navigate } from '@reach/router'

const SingleUserProfile = (props) => {
  const { loggedInAs } = props
  return (
    loggedInAs &&
    <div>
      <h3 className='userWelcomeMessage' >Welcome: {loggedInAs} </h3>
      {props.users && props.users.map(user => {
        if (user.username === props.username) {
          return (
            <div>
              <img className='userImage' src={user.avatar_url} alt src='https://i.imgflip.com/1onp4t.jpg' />
              <div className='userDetails'>
                <h3> Name: {user.name}</h3>
                <h3>Username: {user.username}</h3>
              </div>
              <button className='seeArticlesButton' onClick={() => { handleArticleClick(props.username) }}>See Your Articles</button>
              <button className='logOutButton' onClick={() => handleLogOutClick(props)}>Log Out</button>
            </div>
          )
        }
      })}
    </div>
  )
}

const handleLogOutClick = (props) => {
  const { removeUser } = props
  removeUser()
  navigate('/')
}

const handleArticleClick = (username) => {
  navigate(`/${username}/articles`)
}

export default SingleUserProfile
