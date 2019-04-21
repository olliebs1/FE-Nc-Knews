import React from 'react'
import { postNewArticle } from '../api';

const PostArticleForm = () => {

  const handleClick = (event) => {
    event.preventDefault()
    postNewArticle()
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
          <button onClick={handleClick}>Post Article</button>
        </label>
      </form>
    </div>
  )
}

export default PostArticleForm
