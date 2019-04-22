import React, { Component } from 'react';
import './App.css';
import HeaderNav from './components/HeaderNav';
import { fetchAllUsers } from './api';
import Articles from './components/Articles';
import { Router } from '@reach/router'
import PostArticleForm from './components/PostArticleForm';


class App extends Component {
  state = {
    users: null,
    loggedInAs: '',
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
        <HeaderNav path={'/*'} loggedInAs={this.state.loggedInAs} />
        <form onSubmit={this.handleSubmit} users={this.state.users} className='login-form'>
          {!this.state.loggedInAs ? <input type="text" name="username" /> : <h3>Logged In As: {this.state.loggedInAs}</h3>}
          {!this.state.loggedIn ? <input type="submit" value="Log In" /> : <button onClick={this.handleLogoutClick} className='logout-button'>Log Out</button>}
        </form>
        <Router>
          <Articles path={'/articles'} />
          <PostArticleForm path={'/newArticle'} loggedInAs={this.state.loggedInAs} />
        </Router>
      </div>
    );
  }
}


export default App;
