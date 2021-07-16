import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/TriviaGame.css';
import fetchAPI from '../services/QuestionsAPI';
import { Header, ShowTrivia } from '../components';

export default function Game() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  return (
    <>
      <Header />
      <ShowTrivia />

    </>
  );
}
