import React, { Component } from 'react'
import { fetchArticles } from '../api';
import { navigate } from '@reach/router';

export default class Articles extends Component {

  state = {
    articles: null,
    sortedBy: '',
  }

  componentDidMount() {
    fetchArticles(this.state.sortBy).then(articles => {
      this.setState({ articles })
    })
  }

  SortArticle = (event) => {
    event.preventDefault()
    if (event.target.value !== this.state.sortedBy) {
      this.setState({ sortedBy: event.target.value }, () => {
      })
    }
  }

  handleClick = (event) => {
    navigate('/newArticle')
  }


  render() {
    return (
      <div>
        <h1 className='articles-title'>Articles</h1>
        <br></br>
        <label >
          <select className='sortingSelector' onChange={this.SortArticle}> Sort By
            <option value='sort_by=article_id&&order=asc'>Sort By: Article Id</option>
            <option value='sort_by=created_at&&order=desc' >Sort By: Date</option>
            <option value='sort_by=votes&&order=desc'>Sort By: Num of Votes</option>
            <option value='sort_by=author&&order=asc'>Sort By: Author</option>
            <option value='sort_by=topic&&order=asc'>Sort By: Topic</option>
            <option value='sort_by=title&&order=asc'>Sort By: Title</option>
          </select>
        </label>
        <br></br>
        <button onClick={this.handleClick}>Create Article?</button>
        {this.state.articles &&
          this.state.articles.map(article => {
            return (
              <div className='articles'>
                <h2>Title: {article.title}</h2>
                <h3>Topic: {article.topic}</h3>
              </div>
            )
          })
        }
      </div>
    )
  }
}
