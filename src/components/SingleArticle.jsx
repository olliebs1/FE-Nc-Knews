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
    fetchArticleById(this.props.article_id).then(article => {
      this.setState({ article: article })
    }).catch(err => {
      console.log(err)
      if (err) {
        navigate('/error', {
          replace: true,
          state:
          {
            code: err.code,
            message: err.message,
          }
        },
          console.log(err)
        )
      }
    })
  }

  componentDidUpdate(_, prevState) {
    if (prevState.voteChange !== this.state.voteChange) {
      fetchArticleById(this.props.article_id).then(article => {
        this.setState({ article: article })
      })
    }
  }

  render() {
    const { article } = this.state
    const { username, article_id } = this.props
    return (
      <div className='SingleArticle'>
        {!this.state.article && <h1>LOADING....</h1>}
        {article && <h1>Title: {article.title}</h1>}
        {article && <h3>Article: {article.body}</h3>}
        {article && <VotesComponent votes={article.votes} username={username} article_id={article_id} />}
        <br></br>
        <br></br>
        {article && <Comments article_id={article.article_id} username={this.props.username} />}
      </div>
    )
  }
}
