import React, { Component } from 'react'
import { fetchArticleById } from '../api';
import Comments from './Comments';
import { patchArticleVote } from '../api';
import { navigate } from '@reach/router';


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
    return (
      <div className='SingleArticle'>
        {article && <h1>Title: {article.title}</h1>}
        {article && <h3>Article: {article.body}</h3>}
        <button onClick={() => { this.handleVoteClick(1) }} disabled={!this.props.username || this.state.voteChange > 0}>Vote Up!</button>
        {article && <span>{article.votes}</span>}
        <button onClick={() => { this.handleVoteClick(-1) }} disabled={!this.props.username || this.state.voteChange < 0}>Vote Down!</button>

        {/* {article && <VoteHandler votes={article.votes} article_id={article.article_id} />} */}
        <br></br>
        <br></br>
        {article && <Comments article_id={article.article_id} username={this.props.username} />}
      </div>
    )
  }


  handleVoteClick = newVote => {
    const { article_id } = this.props
    this.setState({
      voteLoading: true,
      voteError: false,
      voted: true
    })
    patchArticleVote(article_id, newVote).then(() => {
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
