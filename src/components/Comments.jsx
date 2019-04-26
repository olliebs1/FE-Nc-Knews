import React, { Component } from 'react'
import { getAllComments, deleteComment, patchCommentVote } from '../api';
import { navigate } from '@reach/router';
import VotesComponent from './VotesComponent';

export default class Comments extends Component {

  state = {
    comments: null,
    noComments: false,
  }

  componentDidMount() {
    const { article_id } = this.props
    getAllComments(article_id).then(comments => {
      this.setState({ comments })
    }).catch(err => {
      this.setState({ noComments: true })
    })
  }

  handleClick = (event) => {
    event.preventDefault()
    navigate(`/articles/${this.props.article_id}/newComment`)
  }

  render() {
    const { comments } = this.state
    const { username } = this.props
    return (
      <div className='comments'>
        <button onClick={this.handleClick} disabled={!username}>Post Comment?</button>
        <br></br>
        <br></br>
        {!this.state.noComments ? <>
          {comments && this.state.comments.map(comment => {
            return <li key={comment.comment_id}>{comment.body}
              <br></br>
              <VotesComponent votes={comment.votes} username={this.props.username} comment_id={comment.comment_id} />
              < button disabled={comment.author !== username} onClick={() => {
                deleteComment(comment.comment_id).then(res => {
                  let filteredcomments = this.state.comments.filter(
                    ({ comment_id }) => comment.comment_id !== comment_id
                  );
                  this.setState({ comments: filteredcomments });
                })
              }} value={comment.comment_id} comment_id={comment.comment_id}>Delete Comment?</button>

            </li>
          })}
        </> : <h2>This Article has no comments</h2>}
      </div>
    )
  }

}
