import React, { useEffect, useState } from 'react';

export default function Timer(props) {
  const { count, counter, setCounter } = props;
  // const [counter, setCounter] = useState(30);
  // const [count, setCount] = useState(true);

  const timer = () => {
    const interval = 1000;
    let timeLeft = setTimeout(() => setCounter(counter - 1), interval);
    console.log(count)
    console.log(counter)
    console.log(timeLeft)
    if (counter > 0 && count) {
      timeLeft = setTimeout(() => setCounter(counter - 1), interval)
      console.log(timeLeft)

      return timeLeft;
    } if (!count || counter === 0) {
      clearTimeout(timeLeft);
    }
  };

  useEffect(() => {
    timer();
  }, [counter]);

  const buttons = document.querySelectorAll('input');
  if (counter === 0) {
    buttons.forEach((button) => button.setAttribute('disabled', true));
  }

  return (
    <div>
      <div>
        <h1>
          Time left:
          {counter}
        </h1>
      </div>
    </div>
  );
}
