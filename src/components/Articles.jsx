import React, { Component } from 'react'
import { fetchArticles, deleteArticle } from '../api';
import { navigate, Link } from '@reach/router';

export default class Articles extends Component {

  state = {
    articles: null,
    sortedBy: '',
  }

  componentDidMount() {
    const { topic } = this.props.topic
    if (this.props.path === '/topics/:topic') {
      // const sortedBy = `topic=${this.props.topic}`
      fetchArticles(topic).then(articles => {
        this.setState({ articles })
      })
    } else if (this.props.path === '/articles') {
      fetchArticles(this.state.sortedBy).then(articles => {
        this.setState({ articles })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('inside did update')
    if (prevState.sortedBy !== this.state.sortedBy) {
      fetchArticles(this.state.sortedBy).then(articles => {
        this.setState({ articles })
      })
    }
  }

  SortArticle = (event) => {
    event.preventDefault()
    if (event.target.value !== this.state.sortedBy) {
      this.setState({ sortedBy: event.target.value })
      navigate(`/articles`)

    }
  }

  handleClick = (event) => {
    navigate('/newArticle')
  }

  handleReadArticleClick = (event) => {
    navigate('/articles/:article_id')
  }

  removeSortedBy = () => {
    this.setState({ sortedBy: '' })
  }


  render() {
    console.log(this.props)
    const { loggedInAs } = this.props
    return (
      <div>
        <h1 className='articles-title'>Articles</h1>
        <br></br>
        <label >
          <select className='sortingSelector' onChange={this.SortArticle}> Sort By
            <option value='article_id&&order=asc'>Sort By: Article Id</option>
            <option value='created_at&&order=desc' >Sort By: Date</option>
            <option value='votes&&order=desc'>Sort By: Num of Votes</option>
            <option value='author&&order=asc'>Sort By: Author</option>
            <option value='topic&&order=asc'>Sort By: Topic</option>
            <option value='title&&order=asc'>Sort By: Title</option>
          </select>
        </label>
        <br></br>
        <br></br>
        <button onClick={this.handleClick}>Create Article?</button>
        {this.state.articles &&
          this.state.articles.map(article => {
            return (
              <div className='articles' key={article.article_id}>
                <h2>Title: {article.title}</h2>
                <h3>Topic: {article.topic}</h3>
                <Link to={`/articles/${article.article_id}`} onClick={this.handleReadArticleClick} >Read Article</Link>
                {loggedInAs && <button onClick={() => {
                  deleteArticle(article.article_id).then(res => {
                    let filteredArticles = this.state.articles.filter(
                      ({ article_id }) => article.article_id !== article_id);
                    this.setState({ articles: filteredArticles }, () => {
                    })
                  })
                }} value='article_id'>Delete Article?</button>}
              </div>
            )
          })
        }
      </div>
    )
  }
}
