import React, { Component } from 'react'
import { Link, navigate } from '@reach/router';
import { deleteArticle } from '../api';


export default class ArticlesCard extends Component {

  state = {
    loading: false
  }

  render() {
    const { article, loggedInAs } = this.props
    const { loading } = this.state
    return (
      <div className='articles' key={article.article_id} >
        <h1>Title: {article.title}</h1>
        <h2>Topic: {article.topic}</h2>
        <h4>Author: {article.author}</h4>
        <h4>Comment count: {article.comment_count}</h4>
        <h4>Created at: {article.created_at}</h4>
        <Link className='readArticleLink' to={`/articles/${article.article_id}`} onClick={this.handleReadArticleClick} >Read Article</Link>
        <br></br>
        <br></br>
        {!loading ? <>
          {article.author === loggedInAs ? <button className='deleteButton' onClick={() => { this.handleDelete(article.article_id) }} >Delete Article?</button> : <h5>Please Log In as {article.author} to delete this article</h5>}
        </> : <h3>Deleting...</h3>}
      </div >
    )
  }
  handleReadArticleClick = () => {
    navigate('/articles/:article_id')
  }

  handleDelete = (article_id) => {
    const { handleDeleteArticleClick } = this.props
    this.setState({ loading: true });
    deleteArticle(article_id).then(() => { handleDeleteArticleClick(article_id) }).then(() => {
      this.setState({ loading: false })

    })
  }
}
