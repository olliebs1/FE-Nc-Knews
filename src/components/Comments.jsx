import React, { Component } from 'react'
import { getAllComments } from '../api';
import { navigate } from '@reach/router';
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
    event.preventDefault()
    const { article_id } = this.props
    navigate(`/articles/${article_id}/newComment`)
  }

  render() {
    const { comments } = this.state
    const { username } = this.props
    return (
      <div className='comments'>
        <h1 className='comments-title'>Comments:</h1>
        <button className='createButton' onClick={this.handleClick} >Post Comment?</button>
        {comments && comments.map(comment => {
          return (
            <div className='allComments'>
              <>
                <CommentCard comment={comment} username={username} handleDeleteCommentClick={this.handleDeleteCommentClick} />
              </>
            </div>
          )
        })
        }
      </div>
    )
  }
  handleDeleteCommentClick = (deletedId) => {
    const { comments } = this.state
    let filteredcomments = comments.filter(
      ({ comment_id }) => comment_id !== deletedId
    );
    this.setState({ comments: filteredcomments });
  }
}

