import React, { Component } from 'react'
import { postNewArticle } from '../api';
import { navigate } from '@reach/router';

export default class PostArticleForm extends Component {

  state = {
    title: null,
    body: null,
    topic: null,
    loading: false,
  }

  render() {
    const { loading, title, article } = this.state
    const { loggedInAs } = this.props
    return (
      <div>
        {!loading ? <form onSubmit={this.handleSubmit}>
          Title: <input className='postArticleInputTitle' type='text' name='title' onChange={this.handleTitleChange}></input>
          <br></br>
          Article: <input className='postArticleInputArticle' type='text' name='article' onChange={this.handleArticleChange}></input>
          <br></br>
          <>
            Topic: <select onChange={this.handleSortTopic} className='topicSortByMenu'>
              <option value='football' >football</option>
              <option value='cooking'>cooking</option>
              <option value='coding'>coding</option>
            </select>
          </>
          <br></br>
          {!loggedInAs ? <h5>Please Log In to post Article.</h5> :
            <>
              < button className='postArticleButton' >Post Article</button>
            </>
          }
        </form> :

          <h1 className='loadingMessage' >LOADING....</h1>
        }
      </div>
    )
  }

  handleSortTopic = (event) => {
    this.setState({ topic: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { loggedInAs } = this.props
    const newArticle = this.state
    newArticle.username = loggedInAs
    this.setState({ loading: true })
    postNewArticle(newArticle).then(() => {
      navigate('/articles')
    })
  }

  handleTitleChange = (event) => {
    event.preventDefault()
    this.setState({ title: event.target.value }
    )
  }

  handleArticleChange = (event) => {
    event.preventDefault()
    this.setState({ body: event.target.value })
  }

  handleTopicChange = (event) => {
    event.preventDefault()
    this.setState({ topic: event.target.value }, () => {
      console.log(this.state)
    })
  }
}






