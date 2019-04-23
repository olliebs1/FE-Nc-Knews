import React, { Component } from 'react'
import { fetchArticles } from '../api';
import { Link } from '@reach/router';

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
      <div>
        {this.state.userArticles.map(userArticle => {
          if (userArticle.author === this.props.username) {
            return (
              <div key={userArticle.article_id}>
                <h3>{userArticle.title}</h3>
                {/* <DeleteArticleById article_id={userArticle.article_id} /> */}
                <Link to={`/articles/${userArticle.article_id}`}>Read Article</Link>
                <br></br>
                <Link to={'/articles'}>See All Articles</Link>
              </div>
            )
          }
        })}
      </div>
    )
  }
}
