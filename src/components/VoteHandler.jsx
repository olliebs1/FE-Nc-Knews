// import React, { Component } from 'react'
// import { patchVote } from '../api';

// export default class VoteHandler extends Component {

//   state = {
//     voteLoading: false,
//     voteChange: 0,
//     voteError: false
//   }

//   render() {
//     const { votes } = this.props
//     return (
//       <div>
//         <button onClick={() => { this.handleVoteClick(1) }}>Vote Up!</button>
//         <span>{votes}</span>
//         <button onClick={() => { this.handleVoteClick(-1) }}>Vote Down!</button>
//       </div>
//     )
//   }

//   handleVoteClick = newVote => {
//     const { article_id } = this.props
//     const { voteLoading, voteError } = this.state
//     this.setState({
//       voteLoading: true,
//       voteError: false
//     })
//     patchVote(article_id, newVote).then(() => {
//       this.setState(prevState => ({
//         voteChange: prevState.voteChange + newVote,
//         voteLoading: false
//       }));
//     }).catch(err => {
//       this.setState(prevState => ({
//         votingError: true,
//         voteLoading: false
//       }))
//     })
//   }


// }
