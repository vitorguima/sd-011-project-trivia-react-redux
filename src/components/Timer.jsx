/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

export default function Timer(props) {
  const { count, counter, setCounter } = props;

  const timer = () => {
    const interval = 1000;
    let timeLeft = setTimeout(() => setCounter(counter - 1), interval);
    if (counter > 0 && count) {
      timeLeft = setTimeout(() => setCounter(counter - 1), interval);
      return timeLeft;
    }
    if (!count || counter === 0) {
      clearTimeout(timeLeft);
    }
  };

  useEffect(() => {
    timer();
  }, [counter]);

  const buttons = document.querySelectorAll('button');
  if (counter === 0) {
    buttons.forEach((button) => button.setAttribute('disabled', true));
    // const allLabels = document.querySelectorAll('label');
    // const btnPrimary = 'btn-primary';
    // allLabels.forEach((el) => {
    //   el.classList.add('btn-danger', 'wrongAnswer');
    //   el.classList.remove(btnPrimary);
    // }
    // );
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
