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
        <h2>Title: {article.title}</h2>
        <h3>Topic: {article.topic}</h3>
        <Link to={`/articles/${article.article_id}`} onClick={this.handleReadArticleClick} >Read Article</Link>
        <br></br>
        <br></br>
        {!loading ? <>
          {article.author === loggedInAs ? < button onClick={() => { this.handleDelete(article.article_id) }} >Delete Article?</button> : <h5>Please Log In as {article.author} to delete this article</h5>}
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
