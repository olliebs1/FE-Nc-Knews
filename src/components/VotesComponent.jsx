import React, { Component } from 'react'
import { patchVote } from '../api';

export default class VotesComponent extends Component {

  state = {
    voteLoading: false,
    voteChange: 0,
    voteError: false,
  }

  render() {
    const { votes } = this.props
    const { voteChange } = this.state
    return (
      <div>
        <button onClick={() => { this.handleVoteClick(1) }} disabled={!this.props.username || this.state.voteChange > 0}>Vote Up!</button>
        <span>{votes + voteChange}</span>
        <button onClick={() => { this.handleVoteClick(-1) }} disabled={!this.props.username || this.state.voteChange < 0}>Vote Down!</button>
      </div>
    )
  }
  handleVoteClick = (newVote) => {
    const { comment_id, article_id } = this.props
    patchVote(comment_id, article_id, newVote)
      .catch(err => {
        this.setState({
          votingError: true,
        })
      })
    this.setState(prevState => ({
      voteChange: prevState.voteChange + newVote,
      voteError: false,
    }))
  }
}
