import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = props => {
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState([
    {
      text: 'If it hurts, do it more often',
      votes: 0,
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    {
      text: 'Premature optimization is the root of all evil.',
      votes: 0,
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },
  ])

  const getRandomNumber = () => {
    const min = 0
    const max = anecdotes.length - 1
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const nextAnecdote = () => setSelected(getRandomNumber())

  const voteAnecdote = () => {
    let newArray = [...anecdotes]
    newArray[selected].votes += 1
    setAnecdotes(newArray)
  }

  return (
    <div>
      <p style={{
        minHeight: '85px',
      }}>
        {anecdotes[selected].text}
      </p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button 
        onClick={nextAnecdote}>
        next anecdote
      </button>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
