import React from 'react'
import { Link } from '@reach/router'

const HeaderNav = ({ loggedInAs, loggedIn }) => {
  return (
    <div>
      <h1 className='Header'>NorthCoders Knews</h1>
      <nav className='NavBar'>
        <Link to='/'>HomePage</Link> / <Link to='/articles'>Articles</Link> / <Link to='/topics'>Topics</Link>
        {loggedIn && <Link to={`/${loggedInAs}`}><h3>Visit your profile - {loggedInAs}</h3></Link>}
        {!loggedInAs ? <Link to={`/signup`}>Sign Up</Link> : <Link to={`/`}></Link>}
      </nav>
    </div>
  )
}

export default HeaderNav
