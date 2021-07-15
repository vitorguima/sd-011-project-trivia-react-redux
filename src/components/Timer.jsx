import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [counter, setCounter] = useState(30);

  useEffect(() => counter > 0 && setTimeout(() => setCounter(counter - 1), 1000),
    [counter]);

  const buttons = document.querySelectorAll('input');
  if (counter === 0) {
    buttons.forEach((button) => button.setAttribute('disabled', true));
  }

  return (
    <div>
      <p>
        Time left:
        {counter}
      </p>
    </div>
  );
}
