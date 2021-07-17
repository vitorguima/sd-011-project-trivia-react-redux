import GameScreen from '../pages/GameScreen';
//import Header from '../components/Header'

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
  this.triviaAPI()
  }

 /* async getQuestionsApi() {
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await request.json();

    this.setState({
      results: data.results,
    });
  }
*/
triviaAPI = async (token) => {
    const TRIVIA_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(TRIVIA_URL);
      const questions = await response.json();
      return questions;
    } catch (error) {
      console.log(error);
    }
    this.setState({
        results: questions.results,
    })
  };





  render() {
    const { results } = this.state;
    console.log(results);
    return (
      <div>
        <Header />
        <GameScreen results={ results } />
      </div>
    );
  }
}

export default Player;