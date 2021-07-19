import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Feedback = () => {
  console.log('Feedback');
  const { score } = useSelector(({ userInfo }) => userInfo.player);
  return (
    <>
      <Header />
      <div data-testid="feedback-text">{ score }</div>
    </>
  );
};

export default Feedback;
