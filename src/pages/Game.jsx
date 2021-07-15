import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import Question from '../components/Question';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({
      questions: data.results[0],
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <Question questions={ questions } />
      </div>
    );
  }
}
