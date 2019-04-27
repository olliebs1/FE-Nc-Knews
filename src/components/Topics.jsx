import React, { Component } from 'react'
import { getTopics, postTopic } from '../api';
import { Link } from '@reach/router';
import { navigate } from '@reach/router/lib/history';

export default class Topics extends Component {

  state = {
    topics: [],
    topic: null,
    slug: null,
    newTopic: false,
    loading: false,
  }

  componentDidMount() {
    getTopics().then(topic => {
      this.setState({ topics: topic, loading: false })
    })
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.topic !== this.state.topic) {
      getTopics().then(topic => {
        this.setState({ topics: topic, loading: false })
      })
    }
  }

  render() {
    const { topics } = this.state
    const { loggedInAs } = this.props
    return (
      <div className='Topics'>
        <h1 className='topics-title' >Topics</h1>
        <br></br>
        {!this.state.loading ?
          <>
            {loggedInAs && <button className='createButton' onClick={this.handleClick}>Create Topic</button>}
            {this.state.newTopic && <form onSubmit={this.handleSubmit}>
              Topic: <input className='topicInput' onChange={this.handleTopicChange} type='text' ></input>
              <br></br>
              Description: <input className='topicInput' onChange={this.handleDescriptionChange}></input>
              <br></br>
              <button className='submitButton'>Submit</button>
            </form>}
          </>
          : <h1>LOADING....</h1>}
        {topics && topics.map(topic => {
          return (
            <div className='IndividualTopic' key={topic.slug}>
              <>
                <h2>Topic: {topic.slug}</h2>
                <h3>Description: {topic.description}</h3>
                <Link className='readTopicLink' to={`/topics/${topic.slug}`}>Read articles with this topic</Link>
                <br></br>
              </>
            </div>
          )
        })}
      </div>
    )
  }


  handleDescriptionChange = (event) => {
    event.preventDefault()
    this.setState({ topic: event.target.value })
  }

  handleTopicChange = (event) => {
    event.preventDefault()
    this.setState({ slug: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newPostTopic = {
      slug: this.state.slug,
      description: this.state.topic,
    }
    this.setState({ loading: true })
    postTopic(newPostTopic).then(() => {
      this.setState({ newTopic: false })
    })
    navigate('topics')
  }


  handleClick = (event) => {
    event.preventDefault()
    this.setState({ newTopic: true })
  }
}
