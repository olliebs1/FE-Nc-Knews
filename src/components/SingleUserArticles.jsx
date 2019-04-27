import React, { Component } from 'react'
import { fetchArticles } from '../api';
import { Link, navigate } from '@reach/router';

export default class SingleUserArticles extends Component {
  state = {
    userArticles: []
  }

  componentDidMount() {
    fetchArticles().then(articles => {
      this.setState({ userArticles: articles })
    })
  }


  render() {
    return (
      <div >
        {this.state.userArticles.map(userArticle => {
          if (userArticle.author === this.props.username) {
            return (
              <div key={userArticle.article_id} className='singleUserArticles'>
                <h2>Title: {userArticle.title}</h2>
                <button className='readArticleButton' onClick={() => { this.handleUsersArticlesClick(userArticle.article_id) }}>Read Article</button>
                <br></br>
                <button className='seeArticlesButton' onClick={this.handleClick}>See All Articles</button>
              </div>
            )
          }
        })}
      </div>
    )
  }
  handleClick = () => {
    navigate('/articles')
  }

  handleUsersArticlesClick = (article_id) => {
    navigate(`/articles/${article_id}`)
  }

}
