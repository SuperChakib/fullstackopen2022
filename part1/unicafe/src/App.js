import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;
  return (
    <div>
      <h2>statistics</h2>
      <Display text={'good'} value={good} />
      <Display text={'neutral'} value={neutral} />
      <Display text={'bad'} value={bad} />
      <Display text={'all'} value={all} />
      <Display text={'average'} value={(good - bad) / all} />
      <Display text={'positive'} value={`${(good / all) * 100} %`} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text={'good'} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
