import React, { useEffect, useState } from 'react';

export default function Timer() {
  const [counter, setCounter] = useState(5);
  const [count, setCount] = useState(true);

  const timer = () => {
    const interval = 1000;
    const timeLeft = setTimeout(() => setCounter(counter - 1), interval);
    if (counter > 0 && count) {
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
