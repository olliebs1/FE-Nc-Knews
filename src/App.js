import React, { Component } from 'react';
import './App.css';
import HeaderNav from './components/HeaderNav';
import { fetchAllUsers } from './api';
import Articles from './components/Articles';
import { Router } from '@reach/router'
import PostArticleForm from './components/PostArticleForm';
import SingleArticle from './components/SingleArticle';
import SingleUserProfile from './components/SingleUserProfile';
import SingleUserArticles from './components/SingleUserArticles';
import PostCommentForm from './components/PostCommentForm';
import Topics from './components/Topics';
import SignUp from './components/SignUp';
import Error from './components/Error';


class App extends Component {
  state = {
    users: null,
    loggedInAs: null,
    validUser: true,
    loggedIn: false
  }


  handleSubmit = (event) => {
    const { users, loggedInAs } = this.state
    event.preventDefault()
    users.map(user => {
      if (user.username === event.target[0].value) {
        this.setState({ loggedInAs: event.target[0].value, loggedIn: true }, () => {
          localStorage.setItem('loggedInAs', loggedInAs)
        })
      } else if (user.username !== event.target[0].value) {
        this.setState({ validUser: false })
      }
    })
  }

  handleLogoutClick = () => {
    this.removeUser()
    localStorage.removeItem('loggedInAs')
  }

  removeUser = () => {
    this.setState({ loggedInAs: '', isLoggedIn: false })
  }

  componentDidMount() {
    const recentLoggedInUser = localStorage.getItem('loggedInAs')
    fetchAllUsers().then((users => {
      this.setState({ users: users, loggedInAs: recentLoggedInUser })
    }))
  }

  render() {
    const { loggedInAs, loggedIn, users } = this.state
    return (
      <div className="App">
        <HeaderNav path={'/*'} loggedInAs={loggedInAs} loggedIn={loggedIn} handleLogoutClick={this.handleLogoutClick} default />

        <form onSubmit={this.handleSubmit} users={users} className='login-form'>
          {!loggedInAs ? <><h3 className='pleaseLogInMessage' >Please Log In</h3> <input className='usernameInput' type="text" name="username" /></> : <h2 className='loggedInAsText'>Logged In As: {loggedInAs}</h2>}
          {loggedInAs ? <button className='logOutButton' onClick={this.handleLogoutClick} >Log Out</button> : <input className='logInInput' type="submit" value="Log In" />}
        </form>
        <Router>
          <Articles key='articlePath' path={'/articles'} loggedInAs={loggedInAs} />
          <Articles key='articleByTopicPath' path={'/topics/:topic'} loggedInAs={loggedInAs} />
          <PostArticleForm path={'/newArticle'} loggedInAs={loggedInAs} />
          <SingleArticle path={`/articles/:article_id`} users={users} username={loggedInAs} />
          <SingleUserProfile path={`/:username`} users={users} removeUser={this.removeUser} loggedInAs={loggedInAs} />
          <SingleUserArticles path={'/:username/articles'} username={loggedInAs} />
          <PostCommentForm path={'/articles/:article_id/newComment'} loggedInAs={loggedInAs} />
          <Topics path={'/topics'} loggedInAs={loggedInAs} />
          <SignUp path={'/signup'} loggedInAs={loggedInAs} />
          <Error path={'/error'} />
        </Router>
        {!loggedInAs && <ul className='userLoginList'>Please Log in with a name from the following list:
          <li key='1'>tickle122</li>
          <li key='2'>grumpy19</li>
          <li key='3'>happyamy2016</li>
          <li key='4'>cooljmessy</li>
          <li key='5'>weegembump</li>
          <li key='6'>jessjelly</li>
          * Case sensitive *
        </ul>}
      </div>
    );
  }
}


export default App;
