import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = props => (
  <>
  {
    !isNaN(props.getAverage()) ?
    <p>average {props.getAverage()}</p> : ''
  }
  {
    !isNaN(props.getPositiveRate()) ?
    <p>positive {props.getPositiveRate()} %</p> : ''
  }
  </>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => good + neutral + bad
  const getAverage = () =>  (good + bad * (-1)) / getTotal()
  const getPositiveRate = () => (good / getTotal()) * 100

  return (
    <div>
      <h1>feedback</h1>
      <div className="buttons">
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <p>good <span>{good}</span></p>
      <p>neutral <span>{neutral}</span></p>
      <p>bad <span>{bad}</span></p>
      <p>all {getTotal()}</p>
      <Statistics 
        getAverage={getAverage} 
        getPositiveRate={getPositiveRate}
      />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);