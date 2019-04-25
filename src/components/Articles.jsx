import React, { Component } from 'react'
import { fetchArticles, deleteArticle } from '../api';
import { navigate, Link } from '@reach/router';

export default class Articles extends Component {

  state = {
    articles: null,
    sortedBy: null,
  }

  componentDidMount() {
    const { topic } = this.props
    const { sortedBy } = this.state
    console.log(this.props.topic, '<<<<<<<<')
    fetchArticles(topic, sortedBy).then(articles => {
      this.setState({ articles })
    })
  }



  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props
    const { sortedBy } = this.state
    if (prevProps.topic !== this.props.topic) {
      fetchArticles(topic, sortedBy).then(articles => {
        this.setState({ articles })
      })
    }
    else if (prevState.sortedBy !== this.state.sortedBy) {
      fetchArticles(topic, sortedBy).then(articles => {
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
    const { loggedInAs } = this.props
    return (
      <div>
        <h1 className='articles-title'>Articles</h1>
        <br></br>
        <label >
          <select className='sortingSelector' onChange={this.SortArticle}> Sort By
            <option value='article_id'>Sort By: Article Id</option>
            <option value='created_at' >Sort By: Date</option>
            <option value='votes'>Sort By: Num of Votes</option>
            <option value='author'>Sort By: Author</option>
            <option value='topic'>Sort By: Topic</option>
            <option value='title'>Sort By: Title</option>
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
