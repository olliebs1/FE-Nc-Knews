import React, { Component } from 'react'
import { fetchArticles, deleteArticle } from '../api';
import { navigate, Link } from '@reach/router';
import ArticlesCard from './ArticlesCard';

export default class Articles extends Component {

  state = {
    articles: [],
    sortedBy: null,
    loading: false,
  }

  componentDidMount() {
    const { topic } = this.props
    const { sortedBy } = this.state
    fetchArticles(topic, sortedBy).then(articles => {
      this.setState({ articles })
    }).catch(err => {
      if (err)
        navigate('/error404')
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props
    const { sortedBy } = this.state
    if (prevProps.topic !== this.props.topic) {
      fetchArticles(topic, sortedBy).then(articles => {
        this.setState({ articles })
      }).catch(err => {
        if (err)
          navigate('/error404')
      })
    }
    else if (prevState.sortedBy !== this.state.sortedBy) {
      fetchArticles(topic, sortedBy).then(articles => {
        this.setState({ articles })
      }).catch(err => {
        navigate('/error404')
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

  removeSortedBy = () => {
    this.setState({ sortedBy: '' })
  }

  render() {
    const { loggedInAs, topic } = this.props
    const { articles } = this.state
    return (
      <div>
        {!topic ? <h1 className='articles-title'>Articles</h1> : <h1>Articles by topic: {topic}</h1>}
        <br></br>
        {!topic && <label >
          <select className='sortingSelector' onChange={this.SortArticle}> Sort By
            <option value='article_id'>Sort By: Article Id</option>
            <option value='created_at' >Sort By: Date</option>
            <option value='votes'>Sort By: Num of Votes</option>
            <option value='author'>Sort By: Author</option>
            <option value='topic'>Sort By: Topic</option>
            <option value='title'>Sort By: Title</option>
          </select>
        </label>}
        <br></br>
        {!topic && <button onClick={this.handleClick}>Create Article?</button>}
        {articles.length > 0 ? articles.map(article => {
          return (
            <>
              <ArticlesCard article={article} loggedInAs={loggedInAs} handleDeleteArticleClick={this.handleDeleteArticleClick} />
            </>
          )
        }) : <>
            <h1>This topic has no articles</h1>
            <Link to={'/newArticle'}>Post Article? </Link>
          </>}
      </div>
    )
  }

  handleDeleteArticleClick = (deletedId) => {
    let filteredArticles = this.state.articles.filter(
      ({ article_id }) => article_id !== deletedId);
    this.setState({ articles: filteredArticles, loading: true })
  }
}
