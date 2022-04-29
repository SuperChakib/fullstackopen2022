import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text={'good'} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      </div>
      <h2>statistics</h2>
      <div>
        <Display text={'good'} value={good} />
        <Display text={'neutral'} value={neutral} />
        <Display text={'bad'} value={bad} />
        <Display text={'all'} value={all} />
        <Display text={'average'} value={(good - bad) / all} />
        <Display text={'positive'} value={`${(good / all) * 100} %`} />
      </div>
    </div>
  );
};

export default App;
