// informações mockadas
const INNITIAL_STATE = {
  questionsArr: [
    {
      category: 'Geography',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Greenland is covered with grass and Iceland covered with ice.',
      correct_answer: 'False',
      incorrect_answers: [
        'True',
      ],
    },
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the last letter of the Greek alphabet?',
      correct_answer: 'Omega',
      incorrect_answers: [
        'Mu',
        'Epsilon',
        'Kappa',
      ],
    },
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'hard',
      question: 'How long is a light-year?',
      correct_answer: '9.461 Trillion Kilometres',
      incorrect_answers: [
        '1 AU',
        '105.40 Earth-years',
        '501.2 Million Miles',
      ],
    },
    {
      category: 'Entertainment: Film',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the name of the queen&#039;s pet in A Bug&#039;s Life?',
      correct_answer: 'Aphie',
      incorrect_answers: [
        'Flik',
        'Hopper',
        'Dot',
      ],
    },
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'medium',
      question: 'How old is the universe?',
      correct_answer: '13.8 Billion Years',
      incorrect_answers: [
        '4.5 Billion Years',
        '7.9 Billion Years',
        '16.2 Billion Years',
      ],
    },
  ],
  currentQuestion: 0,
};

function questions(state = INNITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default questions;
