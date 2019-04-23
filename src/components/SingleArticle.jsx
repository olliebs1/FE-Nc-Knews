import React, { Component } from 'react'
import { fetchArticleById } from '../api';

export default class SingleArticle extends Component {

  state = {
    article: null
  }

  componentDidMount() {
    fetchArticleById(this.props.article_id).then(article => {
      this.setState({ article: article })
    })

  }

  render() {
    const { article } = this.state
    return (
      <div className='SingleArticle'>
        {article && <h1>Title: {article.title}</h1>}
        {article && <h3>Article: {article.body}</h3>}
      </div>
    )
  }
}
