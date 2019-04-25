import React, { Component } from 'react'
import { postNewArticle } from '../api';
import { navigate } from '@reach/router';

export default class PostArticleForm extends Component {

  state = {
    title: null,
    body: null,
    topic: null
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title: <input type='text' name='title' onChange={this.handleTitleChange}></input>
            <br></br>
            Article: <input type='text' name='article' onChange={this.handleArticleChange}></input>
            <br></br>
            Topic: <input type='text' name='topic' onChange={this.handleTopicChange}></input>
            <br></br>
            {!this.props.loggedInAs ? 'Please Log In to post Article.' : <button >Post Article</button>}
          </label>
        </form>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newArticle = this.state
    newArticle.username = this.props.loggedInAs
    postNewArticle(newArticle).then(() => {
      navigate('/articles')
    }
    )
  }

  handleTitleChange = (event) => {
    event.preventDefault()
    this.setState({ title: event.target.value })
  }

  handleArticleChange = (event) => {
    event.preventDefault()
    this.setState({ body: event.target.value })
  }

  handleTopicChange = (event) => {
    event.preventDefault()
    this.setState({ topic: event.target.value })
  }
}






