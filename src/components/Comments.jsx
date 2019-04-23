import React, { Component } from 'react'
import { getAllComments, deleteComment } from '../api';
import { navigate } from '@reach/router';

export default class Comments extends Component {

  state = {
    comments: null
  }

  componentDidMount() {
    const { article_id } = this.props
    getAllComments(article_id).then(comments => {
      this.setState({ comments })
    })
  }

  handleClick = (event) => {
    event.preventDefault()
    navigate(`/articles/${this.props.article_id}/newComment`)
  }

  render() {
    console.log(this.state)
    const { comments } = this.state
    return (
      <div className='comments'>
        <button onClick={this.handleClick}>Post Comment?</button>
        <br></br>
        <br></br>
        {comments && this.state.comments.map(comment => {
          return <li>{comment.body}
            <br></br>
            <button onClick={() => {
              deleteComment(comment.comment_id).then(res => {
                let filteredcomments = this.state.comments.filter(
                  ({ comment_id }) => comment.comment_id !== comment_id
                );
                this.setState({ comments: filteredcomments });
              })
            }} value={comment.comment_id} comment_id={comment.comment_id}>Delete Comment?</button>
          </li>
        })}
      </div>
    )
  }
}
