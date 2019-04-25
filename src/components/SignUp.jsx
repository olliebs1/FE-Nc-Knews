import React, { Component } from 'react'
import { postUser } from '../api';
import { navigate } from '@reach/router';

export default class SignUp extends Component {

  state = {
    username: null,
    avatar_url: null,
    name: null,
  }

  render() {
    const { loggedInAs } = this.props
    return (
      !loggedInAs &&
      <div>
        <form onSubmit={this.handleSubmit}>
          Name: <input onChange={this.handleNameChange}></input>
          Username: <input onChange={this.handleUsernameChange}></input>
          avatar_url: <input onChange={this.handleAvatarChange}></input>
          <br></br>
          <button onClick={this.handleSignUpClick}>Sign Up</button>
        </form>
      </div>
    )
  }

  handleNameChange = (event) => {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }

  handleUsernameChange = (event) => {
    event.preventDefault()
    this.setState({ username: event.target.value })
  }

  handleAvatarChange = (event) => {
    event.preventDefault()
    this.setState({ avatar_url: event.target.value })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    const newUser = this.state
    postUser(newUser).then(() => {
      navigate('/')
    })
  }
}
