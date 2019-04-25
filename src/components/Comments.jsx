import React, { Component } from 'react'
import { getAllComments, deleteComment, patchCommentVote } from '../api';
import { navigate } from '@reach/router';

export default class Comments extends Component {

  state = {
    comments: null,
    voteLoading: false,
    voteChange: 0,
    voteError: false,
    voted: false
  }

  componentDidMount() {
    const { article_id } = this.props
    getAllComments(article_id).then(comments => {
      this.setState({ comments })
    })
  }

  componentDidUpdate(_, prevState) {
    const { article_id } = this.props
    if (prevState.voteChange !== this.state.voteChange) {
      getAllComments(article_id).then(comments => {
        this.setState({ comments })
      })
    }
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
        {comments && this.state.comments.map(comment => {
          return <li>{comment.body}
            <br></br>
            <button onClick={() => { this.handleVoteClick(comment.comment_id, 1) }} disabled={!this.props.username || this.state.voteChange > 0}>Vote Up!</button>
            {comment && <span>{comment.votes}</span>}
            <button onClick={() => { this.handleVoteClick(comment.comment_id, -1) }} disabled={!this.props.username || this.state.voteChange < 0}>Vote Down!</button>
            <br></br>
            <button onClick={() => {
              deleteComment(comment.comment_id).then(res => {
                let filteredcomments = this.state.comments.filter(
                  ({ comment_id }) => comment.comment_id !== comment_id
                );
                this.setState({ comments: filteredcomments });
              })
            }} value={comment.comment_id} comment_id={comment.comment_id} disabled={!username}>Delete Comment?</button>
          </li>
        })}
      </div>
    )
  }
  handleVoteClick = (comment_id, newVote) => {
    this.setState({
      voteLoading: true,
      voteError: false,
      voted: true
    })
    patchCommentVote(comment_id, newVote).then(() => {
      this.setState(prevState => ({
        voteChange: prevState.voteChange + newVote,
        voteLoading: false,
        voted: true
      }));
    })
      .catch(err => {
        this.setState(prevState => ({
          votingError: true,
          voteLoading: false,
          voted: false
        }))
      })
  }
}
