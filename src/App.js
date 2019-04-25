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


class App extends Component {
  state = {
    users: null,
    loggedInAs: null,
    loggedIn: false
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.state.users.map(user => {
      if (user.username === event.target[0].value) {
        this.setState({ loggedInAs: event.target[0].value, loggedIn: true })
      }
    })
  }

  handleLogoutClick = () => {
    this.removeUser()
    navigate('/')
  }

  removeUser = () => {
    this.setState({ loggedInAs: '', isLoggedIn: false })
  }


  componentDidMount() {
    fetchAllUsers().then((users => {
      this.setState({ users })
    }))
  }

  render() {
    return (
      <div className="App">
        <HeaderNav path={'/*'} loggedInAs={this.state.loggedInAs} loggedIn={this.state.loggedIn} />
        <form onSubmit={this.handleSubmit} users={this.state.users} className='login-form'>
          {!this.state.loggedInAs ? <input type="text" name="username" /> : <h3>Logged In As: {this.state.loggedInAs}</h3>}
          {!this.state.loggedIn ? <input type="submit" value="Log In" /> : <button onClick={this.handleLogoutClick} className='logout-button'>Log Out</button>}
        </form>
        <Router>
          <Articles path={'/articles'} loggedInAs={this.state.loggedInAs} />
          <Articles path={'/topics/:topic'} loggedInAs={this.state.loggedInAs} />
          {this.state.loggedInAs && <PostArticleForm path={'/newArticle'} loggedInAs={this.state.loggedInAs} />}
          <SingleArticle path={`/articles/:article_id`} users={this.state.users} username={this.state.loggedInAs} />
          <SingleUserProfile path={`/:username`} username={this.state.loggedInAs} users={this.state.users} removeUser={this.removeUser} loggedInAs={this.state.loggedInAs} />
          <SingleUserArticles path={'/:username/articles'} username={this.state.loggedInAs} />
          <PostCommentForm path={'/articles/:article_id/newComment'} loggedInAs={this.state.loggedInAs} />
          <Topics path={'/topics'} />
          <SignUp path={'/signup'} loggedInAs={this.state.loggedInAs} />
        </Router>
      </div>
    );
  }
}


export default App;
