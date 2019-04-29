import React, { Component } from 'react'
import { deleteComment } from '../api';
import VotesComponent from './VotesComponent';


export default class CommentCard extends Component {
  state = {
    loading: false
  }

  render() {
    const { comment, username } = this.props
    const { loading } = this.state
    return (
      <div className='Singlecomment'>
        <h4>{comment.body}</h4>
        <h5>Created by: {comment.author}</h5>
        <h5>Created: {comment.created_at}</h5>
        <VotesComponent votes={comment.votes} username={username} comment_id={comment.comment_id} />
        {!loading ? <div >
          {comment.author === username ? < button className='deleteButton' disabled={comment.author !== username} onClick={this.handleDelete} value={comment.comment_id} comment_id={comment.comment_id}>Delete Comment?</button> : <h5>Please Log In as {comment.author} to delete this comment</h5>}
        </div > :
          <h3>Deleting...</h3>}
      </div>
    )
  }

  handleDelete = () => {
    const { comment, handleDeleteCommentClick } = this.props
    this.setState({ loading: true });
    deleteComment(comment.comment_id).then(() => { handleDeleteCommentClick(comment.comment_id) }).then(() => {
      this.setState({ loading: false })
    })
  }
}


