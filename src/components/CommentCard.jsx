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
      <div>
        <h4>{comment.body}</h4>
        {!loading ? <div>
          < button disabled={comment.author !== username} onClick={this.handleDelete} value={comment.comment_id} comment_id={comment.comment_id}>Delete Comment?</button>
        </div > : <h3>Deleting...</h3>}
      </div>
    )
  }
  handleDelete = () => {
    const { comment, handleDeleteCommentClick } = this.props
    this.setState({ loading: true });
    // api req
    deleteComment(comment.comment_id).then(() => { handleDeleteCommentClick(comment.comment_id) }).then(() => {
      this.setState({ loading: false })

    })
    // then filter out the comment (with func from props)
    // this.setState({ loading: false })
  }
}


