import React, { Component } from 'react'
import { fetchArticleById } from '../api';
import Comments from './Comments';
import { navigate } from '@reach/router';
import VotesComponent from './VotesComponent';


export default class SingleArticle extends Component {

  state = {
    article: null,
    voteLoading: false,
    voteChange: 0,
    voteError: false,
    voted: false
  }

  componentDidMount() {
    const { article_id } = this.props
    fetchArticleById(article_id).then(article => {
      this.setState({ article: article })
    }).catch(err => {
      if (err) {
        navigate('/error', {
          replace: true,
          state:
          {
            code: err.code,
            message: err.message,
          }
        }
        )
      }
    })
  }

  componentDidUpdate(_, prevState) {
    const { voteChange } = this.state
    const { article_id } = this.props
    if (prevState.voteChange !== voteChange) {
      fetchArticleById(article_id).then(article => {
        this.setState({ article: article })
      })
    }
  }

  render() {
    const { article } = this.state
    const { username, article_id } = this.props
    return (
      <div className='SingleArticle'>
        {!article && <h1>LOADING....</h1>}
        {article && <h1>Title: {article.title}</h1>}
        {article && <h3>Article: {article.body}</h3>}
        {article && <VotesComponent votes={article.votes} username={username} article_id={article_id} />}
        <br></br>
        <br></br>
        {article && <Comments article_id={article.article_id} username={username} />}
      </div>
    )
  }
}
