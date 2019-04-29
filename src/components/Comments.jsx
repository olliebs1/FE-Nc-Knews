import React, { Component } from 'react'
import { getAllComments } from '../api';
import { navigate } from '@reach/router';
import VotesComponent from './VotesComponent';
import CommentCard from './CommentCard';

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
    console.log('clicked')
    event.preventDefault()
    navigate(`/articles/${this.props.article_id}/newComment`)
  }

  render() {
    const { comments } = this.state
    const { username } = this.props
    return (
      <div className='comments'>
        <h1 className='comments-title'>Comments:</h1>
        <button className='createButton' onClick={this.handleClick} disabled={!username}>Post Comment?</button>
        {comments && this.state.comments.map(comment => {
          return (
            <div className='allComments'>
              <>
                <CommentCard comment={comment} username={this.props.username} handleDeleteCommentClick={this.handleDeleteCommentClick} />
                <VotesComponent votes={comment.votes} username={this.props.username} comment_id={comment.comment_id} />
              </>
            </div>
          )
        })
        }
      </div>
    )
  }
  handleDeleteCommentClick = (deletedId) => {
    let filteredcomments = this.state.comments.filter(
      ({ comment_id }) => comment_id !== deletedId
    );
    this.setState({ comments: filteredcomments });
  }
}

