import React, { Component } from 'react'
import { postNewComment } from '../api';
import { navigate } from '@reach/router';

export default class PostCommentForm extends Component {

  state = {
    body: null
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment: <textarea type='text' name='title' onChange={this.handleBodyChange}></textarea>
            <br></br>
            {!this.props.loggedInAs ? 'Please Log In to post Comment.' : <button >Post Comment</button>}
          </label>
        </form>
      </div>
    )
  }


  handleBodyChange = (event) => {
    event.preventDefault()
    this.setState({ body: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { article_id } = this.props
    const newComment = this.state
    newComment.author = this.props.loggedInAs
    postNewComment(article_id, newComment).then(() => {
      navigate(`/articles/${article_id}`)
    }
    )
  }
}
