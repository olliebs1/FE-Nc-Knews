import React from 'react'
import { Link, navigate } from '@reach/router'

const HeaderNav = ({ loggedInAs }) => {

  const handleProfileClick = () => {
    navigate(`/${loggedInAs}`)
  }
  return (
    <div>
      <img className='HeaderImage' src={'https://i.imgur.com/W9ijPko.jpg'}></img>
      <nav className='NavBar'>
        <Link className='homepageLink' to='/'>HomePage</Link> <Link className='articleLink' to='/articles'>Articles</Link>  <Link className='topicsLink' to='/topics'>Topics</Link>
        {!loggedInAs && <Link className='signupLink' to={`/signup`}>Sign Up</Link>}
        <br></br>
        <>
          {loggedInAs && <button className='visitProfileLink' onClick={handleProfileClick}><h3>Visit your profile - {loggedInAs}</h3></button>}
        </>
      </nav>
    </div>
  )



}

export default HeaderNav
