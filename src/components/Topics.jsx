import React, { Component } from 'react'
import { getTopics, postTopic } from '../api';
import { Link } from '@reach/router';

export default class Topics extends Component {

  state = {
    topics: [],
    topic: null,
    slug: null,
    newTopic: false,
  }

  componentDidMount() {
    getTopics().then(topic => {
      this.setState({ topics: topic })
    })
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.topic !== this.state.topic) {
      getTopics().then(topic => {
        this.setState({ topics: topic })
      })
    }
  }

  render() {
    const { topics } = this.state
    const { loggedInAs } = this.props
    return (
      <div className='Topics'>
        <br></br>
        {loggedInAs && <button onClick={this.handleClick}>Create Topic</button>}
        {this.state.newTopic && <form onSubmit={this.handleSubmit}>
          Topic: <input onChange={this.handleTopicChange}></input>
          <br></br>
          Description: <input onChange={this.handleDescriptionChange}></input>
          <br></br>
          <button>Submit</button>
        </form>}
        {topics && topics.map(topic => {
          return (
            <div className='IndividualTopic' key={topic.slug}>
              <h2>Topic: {topic.slug}</h2>
              <h3>Description: {topic.description}</h3>
              <br></br>
              <Link to={`/topics/${topic.slug}`}>Read articles with this topic</Link>
              <br></br>
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
    postTopic(newPostTopic).then(() => {
      this.setState({ newTopic: false })
    })
  }


  handleClick = (event) => {
    event.preventDefault()
    this.setState({ newTopic: true })
  }
}
