/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/TriviaGame.css';
import { fetchAPI } from '../services/QuestionsAPI';
import { Header, ShowTrivia } from '../components';
// import { paintButtons, nextQuestion, randomArray } from '../components/GameFunctions';

export default function Game() {
  const dispatch = useDispatch();
  // const [index, setIndex] = useState(0);
  // const [questions, setQuestions] = useState('');
  // const [answer, setAnswer] = useState('');
  // const [arrayQuestions, setArray] = useState('');
  // const [player, setPlayer] = useState({
  //   player: { name: '', gravatarEmail: '', score: 0, assertions: 0 },
  // });
  // const [count, setCount] = useState(true);
  // const [counter, setCounter] = useState(time);
  // const loginState = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  // useEffect(() => {
  //   localStorage.state = JSON.stringify(player);
  // }, [player]);

  // useEffect(() => randomArray(questions, setArray, index), [questions, index]);

  // const showResults = (e) => {
  //   setAnswer(e);
  //   paintButtons(arrayQuestions);
  // };

  // const props = {
  //   index,
  //   questions,
  //   arrayQuestions,
  //   showResults,
  //   answer,
  //   nextQuestion,
  //   setAnswer,
  //   setIndex,
  //   setPlayer,
  //   player,
  //   count,
  //   setCount,
  //   counter,
  //   setCounter,
  // };

  return (
    <>
      <Header />
<<<<<<< HEAD
      <Timer />
      {questions && <ShowTrivia { ...props } />}
=======
      <ShowTrivia />
      {/* {questions && <ShowTrivia {...props} />} */}
>>>>>>> c6841dfd565c2fbdca41c7bda777c6cd33959ddd
    </>
  );
}
