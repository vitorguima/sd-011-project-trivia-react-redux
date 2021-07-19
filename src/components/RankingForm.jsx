import React from 'react';
import PropTypes from 'prop-types';

export default function RankingForm(props) {
  console.log(props);
  const { picture, name, score, index } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="thumbnail clearfix">
          <img
            src={ picture }
            alt="ALT NAME"
            className="pull-left span2 clearfix"
            style={ { marginRight: '10px' } }
          />
          <div className="caption pull-left">
            <h4 data-testid={ `player-name-${index}` }>{name}</h4>
            <b data-testid={ `player-score-${index}` }>Score </b>
            {score}
          </div>
          <p>
            {index + 1}
            º
          </p>
        </div>
      </div>
    </div>
  );
}

RankingForm.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,

};
