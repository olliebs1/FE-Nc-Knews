import React, { Component } from 'react';
import './App.css';
import HeaderNav from './components/HeaderNav';
import { fetchAllUsers } from './api';
import Articles from './components/Articles';
import { Router, navigate } from '@reach/router'
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
    event.preventDefault()
    this.state.users.map(user => {
      if (user.username === event.target[0].value) {
        this.setState({ loggedInAs: event.target[0].value, loggedIn: true }, () => {
          localStorage.setItem('loggedInAs', this.state.loggedInAs)
        })
      } else if (user.username !== event.target[0].value) {
        this.setState({ validUser: false })
      }
    })
  }

  handleLogoutClick = () => {
    this.removeUser()
    navigate('/')
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
    return (
      <div className="App">
        <HeaderNav path={'/*'} loggedInAs={this.state.loggedInAs} loggedIn={this.state.loggedIn} handleLogoutClick={this.handleLogoutClick} default />

        <form onSubmit={this.handleSubmit} users={this.state.users} className='login-form'>
          {!this.state.loggedInAs ? <><h3 className='pleaseLogInMessage' >Please Log In</h3> <input className='usernameInput' type="text" name="username" /></> : <h2 className='loggedInAsText'>Logged In As: {this.state.loggedInAs}</h2>}
          {this.state.loggedInAs ? <button className='logOutButton' onClick={this.handleLogoutClick} >Log Out</button> : <input className='logInInput' type="submit" value="Log In" />}
        </form>
        {/* {!this.state.validUser && <>
          <p>Invalid Username</p>
        </>} */}


        <Router>
          <Articles path={'/articles'} loggedInAs={this.state.loggedInAs} />
          <Articles path={'/topics/:topic'} loggedInAs={this.state.loggedInAs} />
          <PostArticleForm path={'/newArticle'} loggedInAs={this.state.loggedInAs} />
          <SingleArticle path={`/articles/:article_id`} users={this.state.users} username={this.state.loggedInAs} />
          <SingleUserProfile path={`/:username`} users={this.state.users} removeUser={this.removeUser} loggedInAs={this.state.loggedInAs} />
          <SingleUserArticles path={'/:username/articles'} username={this.state.loggedInAs} />
          <PostCommentForm path={'/articles/:article_id/newComment'} loggedInAs={this.state.loggedInAs} />
          <Topics path={'/topics'} loggedInAs={this.state.loggedInAs} />
          <SignUp path={'/signup'} loggedInAs={this.state.loggedInAs} />
          <Error path={'/error'} />
        </Router>
      </div>
    );
  }
}


export default App;
