import React from 'react';
import { useSelector } from 'react-redux';
import RenderQuestion from '../components/componentsGame/RenderQuestion';

import Header from '../components/Header';

const Game = () => {
  const { questions } = useSelector(({ questionsArray }) => questionsArray);
  console.log(questions);
  return (
    <>
      <Header />
      <RenderQuestion />
    </>
  );
};

export default Game;
