import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = props => (
  <button onClick={() => props.setStat(props.stat + 1)}>{props.text}</button>
)

const Statistics = props => (
<p>{props.text} {props.value} {(props.text === 'positive') ? '%' : ''}</p>
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
        <Button
          text='good'
          stat={good}
          setStat={setGood}
        />
        <Button
          text='neutral'
          stat={neutral}
          setStat={setNeutral}
        />
        <Button
          text='bad'
          stat={bad}
          setStat={setBad}
        />
      </div>
      <section className="statistics">
        <h2>statistics</h2>
        {
          (good === 0 && neutral === 0 && bad === 0 ) ?
          <p>No feedback given</p> : (
            <>
              <Statistics text='good' value={good}/>
              <Statistics text='neutral' value={neutral}/>
              <Statistics text='bad' value={bad}/>
              <Statistics text='all' value={getTotal()}/>
              <Statistics text='average' value={getAverage()}/>
              <Statistics text='positive' value={getPositiveRate()}/>
            </>
          )
        }
      </section>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);