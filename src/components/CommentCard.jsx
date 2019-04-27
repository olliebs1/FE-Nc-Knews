import React, { Component } from 'react'
import { deleteComment } from '../api';


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
        {!loading ? <div >
          < button className='deleteButton' disabled={comment.author !== username} onClick={this.handleDelete} value={comment.comment_id} comment_id={comment.comment_id}>Delete Comment?</button>
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


