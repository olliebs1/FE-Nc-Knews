import React, { Component } from 'react'
import { postNewComment } from '../api';
import { navigate } from '@reach/router';

export default class PostCommentForm extends Component {

  state = {
    body: null,
    loading: false
  }

  render() {
    return (
      <div>
        {!this.state.loading ? <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <br></br>
            <textarea type='text' name='title' onChange={this.handleBodyChange} className='postCommentText'></textarea>
            <br></br>
            {!this.props.loggedInAs ? 'Please Log In to post Comment.' : <button className='postCommentButton'>Post Comment</button>}
          </label>
        </form> : <h1>LOADING....</h1>}
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
    this.setState({ loading: true })
    postNewComment(article_id, newComment).then(() => {
      navigate(`/articles/${article_id}`)
    }
    )
  }
}
