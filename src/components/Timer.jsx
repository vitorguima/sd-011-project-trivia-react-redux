/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimer } from '../actions/gameActions';

export default function Timer() {
  const dispatch = useDispatch();
  const totalTime = 30;
  const gameStore = useSelector((state) => state.game);
  const { timer, selectedChoice } = gameStore;

  useEffect(() => {
    dispatch(setTimer(totalTime));
  }, []);

  const timeChanger = () => {
    const interval = 1000;
    const timeLeft = setTimeout(() => dispatch(setTimer(timer - 1)), interval);
    if (timer > 0) {
      return timeLeft;
    } if (timer === 0) {
      clearTimeout(timeLeft);
    }
  };

  useEffect(() => {
    timeChanger();
  }, [timer]);

  return (
    <div>
      <div>
        <h1>
          Time left:
          {timer}
        </h1>
      </div>
    </div>
  );
}

// const gameStore = useSelector((state) => state.game);
// const { timer } = gameStore;
// const dispatch = useDispatch();
// const time = 10;
// const [counter, setCounter] = useState(time);

// const timeChanger = () => {
//   const interval = 1000;
//   let timeLeft = setTimeout(() => setCounter(counter - 1), interval);
//   if (counter > 0) {
//     timeLeft = setTimeout(() => setCounter(counter - 1), interval);
//     return timeLeft;
//   }
//   if (timer === counter) {
//     clearTimeout(timeLeft);
//   }
//   // if (!count || counter === 0) {
//   //   clearTimeout(timeLeft);
//   // }
// };

// useEffect(() => {
//   dispatch(setTimer(time));
//   timeChanger();
// }, [counter]);

// const buttons = document.querySelectorAll('button[name="q_answer"]');
// if (counter === 0) {
//   buttons.forEach((button) => button.setAttribute('disabled', true));
// const allLabels = document.querySelectorAll('label');
// const btnPrimary = 'btn-primary';
// allLabels.forEach((el) => {
//   el.classList.add('btn-danger', 'wrongAnswer');
//   el.classList.remove(btnPrimary);
// }
// );
// }
