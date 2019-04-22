import React from 'react'
import { postNewArticle } from '../api';
import { navigate } from '@reach/router';


const PostArticleForm = ({ loggedInAs }) => {
  const handleClick = (event) => {
    const newArticle = {
      username: loggedInAs,
      title: 'title',
      body: 'body',
      topic: 'cooking'
    }
    event.preventDefault()
    postNewArticle(newArticle)
  }

  return (
    <div>
      <form>
        <label>
          Title: <input type='text' name='title'></input>
          <br></br>
          Article: <input type='text' name='article'></input>
          <br></br>
          Topic: <input type='text' name='topic'></input>
          <br></br>
          {!loggedInAs ? 'Please Log In to post Article.' : <button onClick={handleClick}>Post Article</button>}
        </label>
      </form>
    </div>
  )
}

export default PostArticleForm
