import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log(useState)

  return (
    <div>
      <h1>feedback</h1>
      <div className="buttons">
        <button>good</button>
        <button>neutral</button>
        <button>bad</button>
      </div>
      <h2>statistics</h2>
      <p>good <span>{good}</span></p>
      <p>neutral <span>{neutral}</span></p>
      <p>bad <span>{bad}</span></p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);