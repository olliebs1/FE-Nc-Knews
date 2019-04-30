import React, { Component } from 'react'
import { fetchArticles } from '../api';
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
    if (prevProps.topic !== topic) {
      fetchArticles(topic, sortedBy).then(articles => {
        this.setState({ articles })
      }).catch(err => {
        if (err)
          navigate('/error404')
      })
    }
    else if (prevState.sortedBy !== sortedBy) {
      fetchArticles(topic, sortedBy).then(articles => {
        this.setState({ articles })
      }).catch(err => {
        navigate('/error404')
      })
    }
  }

  SortArticle = (event) => {
    event.preventDefault()
    const { sortedBy } = this.state
    if (event.target.value !== sortedBy) {
      this.setState({ sortedBy: event.target.value })
      navigate(`/articles`)

    }
  }

  handleClick = () => {
    navigate('/newArticle')
  }

  removeSortedBy = () => {
    this.setState({ sortedBy: '' })
  }

  render() {
    const { loggedInAs, topic } = this.props
    const { articles } = this.state
    return (
      <div className='allArticles'>
        {!topic ? <h1 className='articles-title'>Articles</h1> : <h1>Articles by topic: {topic}</h1>}
        <br></br>
        {!topic && <div >
          Sort By:<select className="custom-select" onChange={this.SortArticle}> Sort By
            <option value='article_id'>Article Id</option>
            <option value='created_at' >Date</option>
            <option value='votes'>Num of Votes</option>
            <option value='author'>Author</option>
            <option value='topic'>Topic</option>
            <option value='title'>Title</option>
          </select>
        </div>}
        <br></br>
        {!topic && <button className='createButton' onClick={this.handleClick}>Create Article?</button>}
        {articles.length > 0 ? articles.map(article => {
          return (
            <>
              <ArticlesCard article={article} loggedInAs={loggedInAs} handleDeleteArticleClick={this.handleDeleteArticleClick} key={article.article_id} />
            </>
          )
        }) : <>
            <h1>This topic has no articles</h1>
            <Link className='createButton' to={'/newArticle'}>Create Article? </Link>
          </>}
      </div>
    )
  }

  handleDeleteArticleClick = (deletedId) => {
    const { articles } = this.state
    let filteredArticles = articles.filter(
      ({ article_id }) => article_id !== deletedId);
    this.setState({ articles: filteredArticles, loading: true })
  }
}
