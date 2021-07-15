import React from 'react';
import PropTypes from 'prop-types';

const ButtonNext = ({ stateAnswers }) => (
  stateAnswers && (<button type="button" data-testid="btn-next">Próxima</button>)
);

export default ButtonNext;

ButtonNext.propTypes = {
  stateAnswers: PropTypes.bool.isRequired,
};
